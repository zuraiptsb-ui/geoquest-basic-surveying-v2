const TOPICS = ["topic1", "topic2", "topic3", "topic4", "topic5"];
const STORAGE_KEY = "geoquest-dcg10263-dgu1b-roster-v1";
const ADMIN_SESSION_KEY = "geoquest-lecturer-auth";
const LECTURER_PIN = "10263";
const QUIZ_KEY = "geoquest-dcg10263-quizzes-v1";
const ATTEMPTS_KEY = "geoquest-dcg10263-attempts-v1";
const RULES_KEY = "geoquest-dcg10263-rules-v1";
const TOPIC_NAMES = ["Introduction to Surveying", "Survey Equipment", "Datum and Coordinates", "Traverse", "Land and Survey Agencies"];
const DEFAULT_RULES = { pointsPerCorrect: 2, maxAttempts: 3, passPercentage: 50, autoApplyScores: true };
const DEFAULT_QUIZZES = [
  { id: "q1", topic: 0, text: "What is the primary purpose of surveying?", options: ["Determine relative positions", "Forecast weather", "Design engines", "Test concrete only"], answer: 0 },
  { id: "q2", topic: 0, text: "Which principle requires working from whole to part?", options: ["Survey control", "Random sampling", "Levelling only", "Map colouring"], answer: 0 },
  { id: "q3", topic: 1, text: "Which instrument measures horizontal and vertical angles?", options: ["Total station", "Measuring tape", "Plumb bob", "Ranging rod"], answer: 0 },
  { id: "q4", topic: 1, text: "A levelling staff is used with which instrument?", options: ["Automatic level", "Compass", "Plan table", "Clinometer only"], answer: 0 },
  { id: "q5", topic: 2, text: "What does a datum provide?", options: ["A reference surface", "A field boundary", "A distance unit", "A drawing scale"], answer: 0 },
  { id: "q6", topic: 2, text: "Coordinates normally identify a point using what?", options: ["Ordered numerical values", "Colour codes", "Student IDs", "Instrument brands"], answer: 0 },
  { id: "q7", topic: 3, text: "A traverse consists of what?", options: ["Connected survey lines", "Contour intervals", "Satellite images", "Random benchmarks"], answer: 0 },
  { id: "q8", topic: 3, text: "A closed traverse should satisfy which check?", options: ["Angular and linear closure", "Colour balance", "Paper size", "Weather tolerance"], answer: 0 },
  { id: "q9", topic: 4, text: "Which agency manages cadastral surveying in Malaysia?", options: ["JUPEM", "MARDI", "MOTAC", "JPJ"], answer: 0 },
  { id: "q10", topic: 4, text: "Land administration records primarily support what?", options: ["Ownership and interests", "Weather forecasts", "Vehicle licensing", "Marine biology"], answer: 0 }
];

const OFFICIAL_STUDENTS = [
  { id: "16DGU26F1001", name: "MUHAMMAD UMAR AZ-ZUHDI BIN MOHD AKHIR", className: "DGU1B", scores: [0, 0, 0, 0, 0] },
  { id: "16DGU26F1005", name: "NURUL QAISARA BINTI MOHAMAD AZIM", className: "DGU1B", scores: [0, 0, 0, 0, 0] },
  { id: "16DGU26F1009", name: "DANISH NORMAN ZIKRY BIN ZULKAFLI", className: "DGU1B", scores: [0, 0, 0, 0, 0] },
  { id: "16DGU26F1013", name: "JAYDEN JEROMIE", className: "DGU1B", scores: [0, 0, 0, 0, 0] },
  { id: "16DGU26F1017", name: "AHMAD SAIFUL HARITH BIN AHMAD TERMIZI", className: "DGU1B", scores: [0, 0, 0, 0, 0] },
  { id: "16DGU26F1021", name: "MOHAMAD SHAHIROL NAQAIM BIN SELHUDIN", className: "DGU1B", scores: [0, 0, 0, 0, 0] },
  { id: "16DGU26F1025", name: "MUHAMMAD ZUL AZIM BIN ZULKEFFLY", className: "DGU1B", scores: [0, 0, 0, 0, 0] },
  { id: "16DGU26F1029", name: "REBECCA A/P THEVARAJAN", className: "DGU1B", scores: [0, 0, 0, 0, 0] },
  { id: "16DGU26F1033", name: "NADILA FARISYA BINTI ABDULLAH", className: "DGU1B", scores: [0, 0, 0, 0, 0] },
  { id: "16DGU26F1037", name: "TAN YI LE", className: "DGU1B", scores: [0, 0, 0, 0, 0] },
  { id: "16DGU26F1041", name: "MUHAMMAD MUSYRIFF MAZIZ BIN MAHAZAR", className: "DGU1B", scores: [0, 0, 0, 0, 0] },
  { id: "16DGU26F1045", name: "LIM HAN ZE", className: "DGU1B", scores: [0, 0, 0, 0, 0] },
  { id: "16DGU26F1049", name: "NUR SYIFA RAYYANA BINTI MUHAMAD HASROL", className: "DGU1B", scores: [0, 0, 0, 0, 0] },
  { id: "16DGU26F1053", name: "MUHAMMAD EIMAN BIN MOHAMAD ROS", className: "DGU1B", scores: [0, 0, 0, 0, 0] },
  { id: "16DGU26F1057", name: "MUHAMMAD SAIFUL HAIKAL BIN MOHD YUSUF", className: "DGU1B", scores: [0, 0, 0, 0, 0] },
  { id: "16DGU26F1061", name: "MUHAMMAD WAZIF BIN MOHD SAYUTHI", className: "DGU1B", scores: [0, 0, 0, 0, 0] },
  { id: "16DGU26F1065", name: "MUHAMMAD SYAHMIE DANIAL BIN SUHAIMI", className: "DGU1B", scores: [0, 0, 0, 0, 0] },
  { id: "16DGU26F1069", name: "MUHAMMAD NAZHAN ZAQWAN BIN ZURAIMI", className: "DGU1B", scores: [0, 0, 0, 0, 0] },
  { id: "16DGU26F1073", name: "MUHAMMAD NAZIF HAIKAL BIN MOHD NAFIZUL", className: "DGU1B", scores: [0, 0, 0, 0, 0] },
  { id: "16DGU26F1077", name: "NURAZMINA ZAHRA BINTI HARIS", className: "DGU1B", scores: [0, 0, 0, 0, 0] },
  { id: "16DGU26F1081", name: "MUHAMMAD IZZAT WAFIY BIN MOHAMAD FAUZI", className: "DGU1B", scores: [0, 0, 0, 0, 0] },
  { id: "16DGU26F1085", name: "NAUFAL IKHWAN BIN MUHAMAT ROSLI", className: "DGU1B", scores: [0, 0, 0, 0, 0] },
  { id: "16DGU26F1089", name: "ZARIEF SOFFIA BINTI ZAHARI AFENDI", className: "DGU1B", scores: [0, 0, 0, 0, 0] },
  { id: "16DGU26F1093", name: "AHMAD AUS AMSYAR BIN MOHD AZIZUL", className: "DGU1B", scores: [0, 0, 0, 0, 0] },
  { id: "16DGU26F1097", name: "MUHAMMAD EZMIR MIZAN BIN AB MAJID", className: "DGU1B", scores: [0, 0, 0, 0, 0] },
  { id: "16DGU26F1101", name: "WAIZURY ALAM BIN MOHD ROZY", className: "DGU1B", scores: [0, 0, 0, 0, 0] },
  { id: "16DGU26F1105", name: "PUTERA SYUKRI BIN MUHAMAD AZAHAR", className: "DGU1B", scores: [0, 0, 0, 0, 0] },
  { id: "16DGU26F1109", name: "MUHAMMAD IRFAN HAKIMI BIN AMRAN", className: "DGU1B", scores: [0, 0, 0, 0, 0] },
  { id: "16DGU26F1113", name: "MUHAMMAD ADI DARWISY BIN MANSOR", className: "DGU1B", scores: [0, 0, 0, 0, 0] },
  { id: "16DGU26F1117", name: "NUR ALYA IRDINA BINTI MOHAMAD ANUAR", className: "DGU1B", scores: [0, 0, 0, 0, 0] }
];

let students = loadStudents();
let quizzes = loadJson(QUIZ_KEY, DEFAULT_QUIZZES);
let attempts = loadJson(ATTEMPTS_KEY, []);
let rules = loadJson(RULES_KEY, DEFAULT_RULES);
const pageType = document.body.dataset.page;
const body = document.querySelector("#leaderboardBody");
const searchInput = document.querySelector("#searchInput");

function loadStudents() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!Array.isArray(saved)) return structuredClone(OFFICIAL_STUDENTS);
    return OFFICIAL_STUDENTS.map(rosterStudent => {
      const savedStudent = saved.find(student => String(student.id) === rosterStudent.id);
      return savedStudent ? { ...rosterStudent, scores: normalizeScores(savedStudent.scores) } : structuredClone(rosterStudent);
    });
  } catch { return structuredClone(OFFICIAL_STUDENTS); }
}

function loadJson(key, fallback) {
  try { const value = JSON.parse(localStorage.getItem(key)); return value ?? structuredClone(fallback); }
  catch { return structuredClone(fallback); }
}

function normalizeScores(scores) {
  return Array.from({ length: 5 }, (_, index) => Math.max(0, Math.min(20, Number(scores?.[index]) || 0)));
}

function saveStudents() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

const totalOf = student => student.scores.reduce((sum, score) => sum + Number(score), 0);
const initials = name => name.split(/\s+/).slice(0, 2).map(word => word[0]).join("").toUpperCase();

function escapeHtml(value) {
  const element = document.createElement("div");
  element.textContent = value;
  return element.innerHTML;
}

function badgeFor(total) {
  if (total >= 90) return { name: "Legend", icon: "◆", className: "legend" };
  if (total >= 80) return { name: "Master", icon: "★", className: "master" };
  if (total >= 70) return { name: "Pathfinder", icon: "▲", className: "pathfinder" };
  if (total >= 50) return { name: "Explorer", icon: "●", className: "explorer" };
  return { name: "Rookie", icon: "⬡", className: "rookie" };
}

function rankedStudents() {
  return [...students].sort((a, b) => totalOf(b) - totalOf(a) || a.name.localeCompare(b.name));
}

function renderLeaderboard() {
  if (!body) return;
  const ranked = rankedStudents();
  const query = searchInput?.value.trim().toLowerCase() || "";
  let visible = ranked.map((student, index) => ({ ...student, rank: index + 1 }));
  const topTenToggle = document.querySelector("#topTenToggle");
  if (topTenToggle?.checked) visible = visible.slice(0, 10);
  if (query) visible = visible.filter(student => student.name.toLowerCase().includes(query) || student.id.toLowerCase().includes(query));

  body.innerHTML = visible.map(student => {
    const total = totalOf(student);
    const badge = badgeFor(total);
    return `<tr>
      <td><span class="rank">#${student.rank}</span></td>
      <td><div class="student-cell"><span class="avatar table-avatar">${initials(student.name)}</span><div><strong>${escapeHtml(student.name)}</strong><small>${escapeHtml(student.id)} · DGU1B</small></div></div></td>
      ${student.scores.map(score => `<td>${score}</td>`).join("")}
      <td class="progress-cell"><div class="progress-label"><span>Progress</span><span>${total}%</span></div><div class="progress-track"><i style="width:${total}%"></i></div></td>
      <td class="total-cell"><strong>${total}</strong><small>${total}%</small></td>
      <td><span class="badge badge-${badge.className}">${badge.icon}</span><span class="badge-name">${badge.name}</span></td>
    </tr>`;
  }).join("");

  document.querySelector("#emptyState").hidden = visible.length > 0;
  updateStats();
  renderPodium(ranked.slice(0, 3));
}

function updateStats() {
  const totals = students.map(totalOf);
  const count = document.querySelector("#studentCount");
  const average = document.querySelector("#classAverage");
  const top = document.querySelector("#topScore");
  if (count) count.textContent = students.length;
  if (average) average.textContent = `${totals.length ? Math.round(totals.reduce((a, b) => a + b, 0) / totals.length) : 0}%`;
  if (top) top.textContent = totals.length ? Math.max(...totals) : 0;
}

function renderPodium(top) {
  const podium = document.querySelector("#podium");
  if (!podium) return;
  podium.innerHTML = top.map((student, index) => `<article class="podium-card"><span class="podium-rank">${["①", "②", "③"][index]}</span><span class="avatar">${initials(student.name)}</span><div class="podium-info"><strong>${escapeHtml(student.name)}</strong><small>${badgeFor(totalOf(student)).name}</small></div><span class="podium-score">${totalOf(student)}</span></article>`).join("");
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function initializeStudentPage() {
  renderLeaderboard();
  searchInput?.addEventListener("input", renderLeaderboard);
  document.querySelector("#topTenToggle")?.addEventListener("change", renderLeaderboard);
  window.addEventListener("storage", event => {
    if (event.key === STORAGE_KEY) { students = loadStudents(); renderLeaderboard(); }
  });
}

function initializeAdminPage() {
  const pinGate = document.querySelector("#pinGate");
  const adminApp = document.querySelector("#adminApp");
  const pinForm = document.querySelector("#pinForm");
  const pinInput = document.querySelector("#pinInput");
  const pinError = document.querySelector("#pinError");

  function unlockAdmin() {
    document.body.classList.remove("locked");
    pinGate.hidden = true;
    adminApp.setAttribute("aria-hidden", "false");
    syncStudentOptions();
    renderLeaderboard();
    updatePreview();
    renderQuestionManager();
    renderAttempts();
    loadRulesForm();
  }

  if (sessionStorage.getItem(ADMIN_SESSION_KEY) === "authorized") unlockAdmin();

  pinForm.addEventListener("submit", event => {
    event.preventDefault();
    if (pinInput.value !== LECTURER_PIN) {
      pinError.textContent = "Incorrect PIN. Access denied.";
      pinInput.value = "";
      pinInput.focus();
      return;
    }
    sessionStorage.setItem(ADMIN_SESSION_KEY, "authorized");
    pinError.textContent = "";
    unlockAdmin();
  });

  document.querySelector("#logoutButton").addEventListener("click", () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    document.body.classList.add("locked");
    pinGate.hidden = false;
    adminApp.setAttribute("aria-hidden", "true");
    pinInput.value = "";
    pinInput.focus();
  });

  document.querySelector("#studentName").addEventListener("change", loadSelectedScores);
  TOPICS.forEach(id => document.querySelector(`#${id}`).addEventListener("input", updatePreview));
  document.querySelector("#scoreForm").addEventListener("submit", updateSelectedScore);
  document.querySelector("#resetSelected").addEventListener("click", resetSelectedScore);
  document.querySelector("#resetAll").addEventListener("click", resetAllScores);
  searchInput.addEventListener("input", renderLeaderboard);
  document.querySelector("#quizManagerForm").addEventListener("submit", addQuestion);
  document.querySelector("#questionList").addEventListener("click", deleteQuestion);
  document.querySelector("#rulesForm").addEventListener("submit", saveRules);
  document.querySelector("#clearAttempts").addEventListener("click", clearAttempts);
}

function syncStudentOptions() {
  const select = document.querySelector("#studentName");
  const selectedId = select.value;
  select.innerHTML = `<option value="">Select a student</option>${OFFICIAL_STUDENTS.map(student => `<option value="${student.id}">${student.id} — ${escapeHtml(student.name)}</option>`).join("")}`;
  if (students.some(student => student.id === selectedId)) select.value = selectedId;
}

function loadSelectedScores(event) {
  const student = students.find(item => item.id === event.target.value);
  TOPICS.forEach((id, index) => document.querySelector(`#${id}`).value = student ? student.scores[index] : 0);
  updatePreview();
}

function updatePreview() {
  const total = TOPICS.reduce((sum, id) => sum + (Number(document.querySelector(`#${id}`).value) || 0), 0);
  document.querySelector("#previewTotal").textContent = total;
  document.querySelector("#previewBar").style.width = `${Math.min(total, 100)}%`;
}

function updateSelectedScore(event) {
  event.preventDefault();
  const studentId = document.querySelector("#studentName").value;
  const scores = TOPICS.map(id => Number(document.querySelector(`#${id}`).value));
  if (!studentId) return showToast("Select a student first.");
  if (scores.some(score => !Number.isFinite(score) || score < 0 || score > 20)) return showToast("Each score must be between 0 and 20.");
  const student = students.find(item => item.id === studentId);
  student.scores = scores;
  saveStudents();
  renderLeaderboard();
  showToast(`${student.name}'s scores were updated.`);
}

function resetSelectedScore() {
  const studentId = document.querySelector("#studentName").value;
  if (!studentId) return showToast("Select a student first.");
  const student = students.find(item => item.id === studentId);
  if (!confirm(`Reset all five scores for ${student.name}?`)) return;
  student.scores = [0, 0, 0, 0, 0];
  saveStudents();
  loadSelectedScores({ target: { value: studentId } });
  renderLeaderboard();
  showToast(`${student.name}'s scores were reset.`);
}

function resetAllScores() {
  if (!confirm("Reset Topic 1–5 scores to zero for all 30 students?")) return;
  students = students.map(student => ({ ...student, scores: [0, 0, 0, 0, 0] }));
  saveStudents();
  const selectedId = document.querySelector("#studentName").value;
  loadSelectedScores({ target: { value: selectedId } });
  renderLeaderboard();
  showToast("All student scores were reset to zero.");
}

function topicOptions(selected = 0) {
  return TOPIC_NAMES.map((name, index) => `<option value="${index}"${index === Number(selected) ? " selected" : ""}>Topic ${index + 1} — ${name}</option>`).join("");
}

function renderQuestionManager() {
  const topic = document.querySelector("#questionTopic");
  if (!topic) return;
  if (!topic.options.length) topic.innerHTML = topicOptions();
  document.querySelector("#questionCount").textContent = `${quizzes.length} questions`;
  document.querySelector("#questionList").innerHTML = quizzes.map(question => `<div class="question-admin-row"><div><small>Topic ${question.topic + 1}</small><strong>${escapeHtml(question.text)}</strong></div><button class="delete-question" data-question-id="${question.id}" type="button">Delete</button></div>`).join("") || `<p class="empty-state">No questions configured.</p>`;
}

function addQuestion(event) {
  event.preventDefault();
  const options = ["optionA", "optionB", "optionC", "optionD"].map(id => document.querySelector(`#${id}`).value.trim());
  quizzes.push({ id: `q${Date.now()}`, topic: Number(document.querySelector("#questionTopic").value), text: document.querySelector("#questionText").value.trim(), options, answer: Number(document.querySelector("#correctAnswer").value) });
  localStorage.setItem(QUIZ_KEY, JSON.stringify(quizzes));
  event.target.reset(); renderQuestionManager(); showToast("Quiz question added.");
}

function deleteQuestion(event) {
  const button = event.target.closest("[data-question-id]");
  if (!button || !confirm("Delete this quiz question?")) return;
  quizzes = quizzes.filter(question => question.id !== button.dataset.questionId);
  localStorage.setItem(QUIZ_KEY, JSON.stringify(quizzes)); renderQuestionManager(); showToast("Question deleted.");
}

function loadRulesForm() {
  document.querySelector("#pointsPerCorrect").value = rules.pointsPerCorrect;
  document.querySelector("#maxAttempts").value = rules.maxAttempts;
  document.querySelector("#passPercentage").value = rules.passPercentage;
  document.querySelector("#autoApplyScores").checked = Boolean(rules.autoApplyScores);
}

function saveRules(event) {
  event.preventDefault();
  rules = { pointsPerCorrect: Number(document.querySelector("#pointsPerCorrect").value), maxAttempts: Number(document.querySelector("#maxAttempts").value), passPercentage: Number(document.querySelector("#passPercentage").value), autoApplyScores: document.querySelector("#autoApplyScores").checked };
  localStorage.setItem(RULES_KEY, JSON.stringify(rules)); showToast("Scoring rules saved.");
}

function renderAttempts() {
  const attemptBody = document.querySelector("#attemptBody");
  if (!attemptBody) return;
  attemptBody.innerHTML = [...attempts].reverse().map(attempt => `<tr><td>${new Date(attempt.date).toLocaleString()}</td><td><strong>${escapeHtml(attempt.studentName)}</strong><small class="table-sub">${attempt.studentId}</small></td><td>Topic ${attempt.topic + 1}</td><td>${attempt.correct}/${attempt.total}</td><td>${attempt.percentage}%</td><td><span class="status-pill ${attempt.passed ? "passed" : "retry"}">${attempt.passed ? "Passed" : "Retry"}</span></td></tr>`).join("");
  document.querySelector("#attemptEmpty").hidden = attempts.length > 0;
}

function clearAttempts() {
  if (!attempts.length || !confirm("Clear all recorded quiz attempts?")) return;
  attempts = []; localStorage.setItem(ATTEMPTS_KEY, "[]"); renderAttempts(); showToast("Attempt history cleared.");
}

function initializeQuizPage() {
  const studentSelect = document.querySelector("#quizStudent");
  studentSelect.innerHTML = `<option value="">Select your name</option>${OFFICIAL_STUDENTS.map(student => `<option value="${student.id}">${student.id} — ${escapeHtml(student.name)}</option>`).join("")}`;
  document.querySelector("#quizTopic").innerHTML = topicOptions();
  document.querySelector("#loadQuiz").addEventListener("click", loadQuiz);
  document.querySelector("#quizForm").addEventListener("submit", submitQuiz);
  document.querySelector("#retryQuiz").addEventListener("click", () => { document.querySelector("#resultPanel").hidden = true; document.querySelector("#quizPanel").hidden = true; });
}

function loadQuiz() {
  const studentId = document.querySelector("#quizStudent").value;
  const topic = Number(document.querySelector("#quizTopic").value);
  if (!studentId) return showToast("Select your name and student ID.");
  const previous = attempts.filter(attempt => attempt.studentId === studentId && attempt.topic === topic).length;
  if (previous >= rules.maxAttempts) return showToast(`Maximum ${rules.maxAttempts} attempts reached for this topic.`);
  const questions = quizzes.filter(question => question.topic === topic);
  if (!questions.length) return showToast("No questions are available for this topic.");
  document.querySelector("#activeTopic").textContent = `Topic ${topic + 1}: ${TOPIC_NAMES[topic]}`;
  document.querySelector("#quizQuestionCount").textContent = `${questions.length} questions · Attempt ${previous + 1}/${rules.maxAttempts}`;
  document.querySelector("#quizQuestions").innerHTML = questions.map((question, index) => `<fieldset class="quiz-question" data-question-id="${question.id}"><legend><span>${String(index + 1).padStart(2, "0")}</span>${escapeHtml(question.text)}</legend>${question.options.map((option, optionIndex) => `<label class="answer-option"><input type="radio" name="answer-${question.id}" value="${optionIndex}" required><span>${escapeHtml(option)}</span></label>`).join("")}</fieldset>`).join("");
  document.querySelector("#quizPanel").hidden = false; document.querySelector("#resultPanel").hidden = true;
  document.querySelector("#attemptNotice").textContent = `${rules.maxAttempts - previous} attempt(s) available for this topic.`;
}

function submitQuiz(event) {
  event.preventDefault();
  const studentId = document.querySelector("#quizStudent").value;
  const topic = Number(document.querySelector("#quizTopic").value);
  const topicQuestions = quizzes.filter(question => question.topic === topic);
  let correct = 0;
  topicQuestions.forEach(question => { const choice = document.querySelector(`input[name="answer-${question.id}"]:checked`); if (Number(choice?.value) === question.answer) correct++; });
  const percentage = Math.round((correct / topicQuestions.length) * 100);
  const student = students.find(item => item.id === studentId);
  const attempt = { id: Date.now(), date: new Date().toISOString(), studentId, studentName: student.name, topic, correct, total: topicQuestions.length, points: correct * rules.pointsPerCorrect, percentage, passed: percentage >= rules.passPercentage };
  attempts.push(attempt); localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts));
  if (rules.autoApplyScores) { student.scores[topic] = Math.round(percentage / 5); saveStudents(); }
  document.querySelector("#quizPanel").hidden = true; document.querySelector("#resultPanel").hidden = false;
  document.querySelector("#resultContent").innerHTML = `<div class="result-score ${attempt.passed ? "passed" : "retry"}"><strong>${percentage}%</strong><span>${attempt.passed ? "Mission passed" : "More practice required"}</span></div><div class="result-details"><p><span>Correct answers</span><strong>${correct} / ${topicQuestions.length}</strong></p><p><span>Points earned</span><strong>${attempt.points}</strong></p><p><span>Topic score</span><strong>${student.scores[topic]} / 20</strong></p></div>`;
}

if (pageType === "admin") initializeAdminPage();
else if (pageType === "quiz") initializeQuizPage();
else initializeStudentPage();
