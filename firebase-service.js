import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signInAnonymously, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { getFirestore, collection, doc, getDocs, setDoc, deleteDoc, addDoc, onSnapshot, query, orderBy, serverTimestamp, writeBatch } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
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
  ensure: () => auth.currentUser ? Promise.resolve(auth.currentUser) : signInAnonymously(auth).then(result => result.user)
};

const watch = (name, callback, sorter) => onSnapshot(sorter ? query(collection(db, name), orderBy(sorter.field, sorter.direction)) : collection(db, name), snapshot => callback(snapshot.docs.map(item => ({ id: item.id, ...item.data() }))));

export const geoquestStore = {
  watchStudents: callback => watch("students", callback),
  watchQuizzes: callback => watch("quizzes", callback),
  watchAttempts: callback => watch("attempts", callback, { field: "createdAt", direction: "desc" }),
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
  saveAttempt: attempt => addDoc(collection(db, "attempts"), { ...attempt, createdAt: serverTimestamp(), submittedBy: auth.currentUser?.uid || null }),
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
    const existing = await getDocs(collection(db, "students"));
    if (!existing.empty) return false;
    const batch = writeBatch(db);
    students.forEach(student => batch.set(doc(db, "students", student.id), student));
    quizzes.forEach(question => batch.set(doc(db, "quizzes", question.id), question));
    badges.forEach((badge, index) => batch.set(doc(db, "badges", `topic-${index + 1}`), badge));
    batch.set(doc(db, "settings", "scoring"), rules);
    await batch.commit();
    return true;
  }
};
