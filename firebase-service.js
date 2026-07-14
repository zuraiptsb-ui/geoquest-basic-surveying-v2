import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signInAnonymously, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { getFirestore, collection, doc, getDocs, setDoc, deleteDoc, onSnapshot, query, orderBy, serverTimestamp, writeBatch, runTransaction } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const lecturerAuth = {
  signIn: (email, password) => signInWithEmailAndPassword(auth, email, password),
  signOut: () => signOut(auth),
  observe: callback => onAuthStateChanged(auth, callback),
  isLecturer: user => user && !user.isAnonymous
};

export const studentAuth = {
  async ensure() {
    if (auth.currentUser?.isAnonymous) return auth.currentUser;
    if (auth.currentUser) await signOut(auth);
    return signInAnonymously(auth).then(result => result.user);
  }
};

const watch = (name, callback, sorter) => onSnapshot(sorter ? query(collection(db, name), orderBy(sorter.field, sorter.direction)) : collection(db, name), snapshot => callback(snapshot.docs.map(item => ({ id: item.id, ...item.data() }))));

export const geoquestStore = {
  watchStudents: callback => watch("students", callback),
  watchQuizzes: callback => watch("quizzes", callback),
  watchAttempts: callback => watch("attempts", records => callback(records.filter(record => !record.system)), { field: "createdAt", direction: "desc" }),
  watchRankings: callback => watch("rankings", callback, { field: "rank", direction: "asc" }),
  watchRules: callback => onSnapshot(doc(db, "settings", "scoring"), snapshot => callback(snapshot.exists() ? snapshot.data() : null)),
  async saveLeaderboard(studentRecords) {
    const batch = writeBatch(db);
    studentRecords.forEach(student => {
      batch.set(doc(db, "students", student.id), { ...student, updatedAt: serverTimestamp() }, { merge: true });
      batch.set(doc(db, "rankings", student.id), { studentId: student.id, name: student.name, rank: student.rank, total: student.total, percentage: student.percentage, badge: student.badge, updatedAt: serverTimestamp() }, { merge: true });
    });
    await batch.commit();
  },
  async submitAttempt({ attempt, student, ranking }) {
    const user = await studentAuth.ensure();
    const attemptId = `${attempt.studentId}-${attempt.topic}-${Date.now()}`;
    const submittedAttempt = { ...attempt, id: attemptId, createdAt: serverTimestamp(), submittedBy: user.uid };
    const batch = writeBatch(db);
    batch.set(doc(db, "attempts", attemptId), submittedAttempt);
    // Send only fields that a quiz is allowed to change. Spreading the entire
    // Firestore record also sent legacy metadata and caused affectedKeys() in
    // the security rule to reject otherwise valid submissions.
    batch.set(doc(db, "students", student.id), {
      scores: student.scores,
      total: student.total,
      percentage: student.percentage,
      badge: student.badge,
      topicBadges: student.topicBadges,
      completionStatus: student.completionStatus,
      lastAttemptId: attemptId,
      lastAttemptUid: user.uid,
      lastSubmittedTopic: attempt.topic,
      updatedAt: serverTimestamp()
    }, { merge: true });
    batch.set(doc(db, "rankings", student.id), {
      studentId: ranking.studentId,
      name: ranking.name,
      rank: ranking.rank,
      total: ranking.total,
      percentage: ranking.percentage,
      badge: ranking.badge,
      lastAttemptId: attemptId,
      lastAttemptUid: user.uid,
      updatedAt: serverTimestamp()
    }, { merge: true });
    await batch.commit();
    return { ...submittedAttempt, createdAt: new Date().toISOString() };
  },
  saveQuiz: question => setDoc(doc(db, "quizzes", question.id), { ...question, updatedAt: serverTimestamp() }, { merge: true }),
  deleteQuiz: id => deleteDoc(doc(db, "quizzes", id)),
  async deleteStudent(id) {
    const batch = writeBatch(db);
    batch.delete(doc(db, "students", id));
    batch.delete(doc(db, "rankings", id));
    await batch.commit();
  },
  saveRules: rules => setDoc(doc(db, "settings", "scoring"), { ...rules, updatedAt: serverTimestamp() }, { merge: true }),
  async clearAttempts() {
    const snapshot = await getDocs(collection(db, "attempts"));
    const batch = writeBatch(db);
    snapshot.docs.forEach(item => batch.delete(item.ref));
    await batch.commit();
  },
  async seed({ students, quizzes, rules, badges }) {
    const seedMarker = doc(db, "settings", "database-seed");
    return runTransaction(db, async transaction => {
      const marker = await transaction.get(seedMarker);
      if (marker.exists()) return false;

      students.forEach(student => {
        transaction.set(doc(db, "students", student.id), {
          ...student,
          updatedAt: serverTimestamp()
        });
        transaction.set(doc(db, "rankings", student.id), {
          studentId: student.id,
          name: student.name,
          rank: student.rank,
          total: student.total,
          percentage: student.percentage,
          badge: student.badge,
          updatedAt: serverTimestamp()
        });
      });
      quizzes.forEach(question => transaction.set(doc(db, "quizzes", question.id), {
        ...question,
        updatedAt: serverTimestamp()
      }));
      badges.forEach((badge, index) => transaction.set(doc(db, "badges", badge.id || `badge-${index + 1}`), {
        ...badge,
        updatedAt: serverTimestamp()
      }));
      transaction.set(doc(db, "attempts", "_seed"), {
        system: true,
        description: "Collection initialization marker",
        createdAt: serverTimestamp()
      });
      transaction.set(doc(db, "settings", "scoring"), {
        ...rules,
        updatedAt: serverTimestamp()
      });
      transaction.set(seedMarker, {
        version: 1,
        studentCount: students.length,
        quizCount: quizzes.length,
        badgeCount: badges.length,
        completed: true,
        seededAt: serverTimestamp()
      });
      return true;
    });
  }
};
