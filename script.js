import { lecturerAuth, studentAuth, geoquestStore } from "./firebase-service.js";

const TOPICS = ["topic1", "topic2", "topic3", "topic4", "topic5"];
const STORAGE_KEY = "geoquest-dcg10263-dgu1b-roster-v1";
const QUIZ_KEY = "geoquest-dcg10263-quizzes-v2";
const ATTEMPTS_KEY = "geoquest-dcg10263-attempts-v1";
const RULES_KEY = "geoquest-dcg10263-rules-v1";
const TOPIC_NAMES = ["Introduction to Surveying", "Survey Equipment", "Datum and Coordinates", "Traverse", "Land and Survey Agencies"];
const TOPIC_BADGES = [
  { name: "Surveying Explorer", icon: "⌖", description: "Mastered surveying foundations." },
  { name: "Total Station Specialist", icon: "◉", description: "Mastered survey equipment." },
  { name: "Datum Navigator", icon: "◇", description: "Mastered datum and coordinates." },
  { name: "Traverse Champion", icon: "△", description: "Mastered traverse computation." },
  { name: "Land Agency Expert", icon: "▣", description: "Mastered land and survey agencies." }
];
const DEFAULT_RULES = { pointsPerCorrect: 2, maxAttempts: 3, passPercentage: 50, attemptRule: "highest" };
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
  ,{ id: "q11", topic: 0, text: "Which survey establishes points for later detailed work?", options: ["Control survey", "Hydrographic survey", "Mine survey", "Route survey"], answer: 0 }
  ,{ id: "q12", topic: 0, text: "Plane surveying assumes the earth surface is what?", options: ["Flat over a limited area", "Perfectly spherical", "Always vertical", "Underwater"], answer: 0 }
  ,{ id: "q13", topic: 0, text: "Geodetic surveying accounts for which factor?", options: ["Earth curvature", "Paper colour", "Instrument price", "Cloud type"], answer: 0 }
  ,{ id: "q14", topic: 0, text: "A survey point permanently marked on the ground is called what?", options: ["Monument", "Contour", "Legend", "Scale"], answer: 0 }
  ,{ id: "q15", topic: 0, text: "What should be done before field measurements begin?", options: ["Reconnaissance", "Final plotting", "Data deletion", "Map printing"], answer: 0 }
  ,{ id: "q16", topic: 0, text: "Accuracy describes closeness to what?", options: ["The true value", "Repeated values only", "The field book", "The map border"], answer: 0 }
  ,{ id: "q17", topic: 0, text: "Precision describes agreement among what?", options: ["Repeated measurements", "Different map colours", "Land titles", "Agency names"], answer: 0 }
  ,{ id: "q18", topic: 0, text: "Survey field notes should be recorded when?", options: ["During observation", "Several weeks later", "After deletion", "Only after plotting"], answer: 0 }
  ,{ id: "q19", topic: 1, text: "Which equipment provides a vertical reference line?", options: ["Plumb bob", "Prism", "Tripod", "Staff bubble"], answer: 0 }
  ,{ id: "q20", topic: 1, text: "A ranging rod is mainly used to do what?", options: ["Mark and align points", "Measure angles", "Store coordinates", "Calculate areas"], answer: 0 }
  ,{ id: "q21", topic: 1, text: "What does EDM measure electronically?", options: ["Distance", "Temperature", "Area", "Pressure"], answer: 0 }
  ,{ id: "q22", topic: 1, text: "Why is a tripod used?", options: ["Provide stable instrument support", "Measure chain length", "Record field notes", "Mark a boundary permanently"], answer: 0 }
  ,{ id: "q23", topic: 1, text: "Which instrument combines angle and distance measurement?", options: ["Total station", "Optical square", "Tape", "Level staff"], answer: 0 }
  ,{ id: "q24", topic: 1, text: "A prism is commonly paired with which equipment?", options: ["Total station", "Planimeter", "Compass only", "Drawing board"], answer: 0 }
  ,{ id: "q25", topic: 1, text: "The circular bubble helps an instrument become what?", options: ["Approximately level", "Magnetized", "Waterproof", "Calibrated in distance"], answer: 0 }
  ,{ id: "q26", topic: 1, text: "GNSS equipment determines position using what?", options: ["Satellite signals", "Tidal gauges", "Magnetic tape", "Contour lines"], answer: 0 }
  ,{ id: "q27", topic: 2, text: "A benchmark provides a known value of what?", options: ["Elevation", "Bearing only", "Area", "Temperature"], answer: 0 }
  ,{ id: "q28", topic: 2, text: "Easting values normally increase toward which direction?", options: ["East", "West", "Down", "South only"], answer: 0 }
  ,{ id: "q29", topic: 2, text: "Northing values normally increase toward which direction?", options: ["North", "East", "West", "Down"], answer: 0 }
  ,{ id: "q30", topic: 2, text: "A vertical datum is used mainly for what?", options: ["Heights", "Colours", "Ownership", "Instrument serial numbers"], answer: 0 }
  ,{ id: "q31", topic: 2, text: "A horizontal datum supports which information?", options: ["Plan positions", "Weather data", "Material strength", "Time zones"], answer: 0 }
  ,{ id: "q32", topic: 2, text: "Latitude is measured north or south of what?", options: ["The equator", "Prime meridian", "A benchmark", "A traverse line"], answer: 0 }
  ,{ id: "q33", topic: 2, text: "Longitude is measured east or west of what?", options: ["The prime meridian", "The equator", "Mean sea level", "A contour"], answer: 0 }
  ,{ id: "q34", topic: 2, text: "GDM2000 is an example of what?", options: ["Geodetic datum", "Survey instrument", "Land office", "Distance unit"], answer: 0 }
  ,{ id: "q35", topic: 3, text: "A traverse station is a point where what is observed?", options: ["Angles and distances", "Only rainfall", "Only ownership", "Only contour colour"], answer: 0 }
  ,{ id: "q36", topic: 3, text: "An open traverse ends where?", options: ["At an unverified point", "At its starting point", "At two known points", "At mean sea level"], answer: 0 }
  ,{ id: "q37", topic: 3, text: "A closed-loop traverse ends at what?", options: ["Its starting point", "An unknown elevation", "A random point", "A map legend"], answer: 0 }
  ,{ id: "q38", topic: 3, text: "Angular misclosure is distributed by what process?", options: ["Adjustment", "Ranging", "Levelling", "Scaling"], answer: 0 }
  ,{ id: "q39", topic: 3, text: "The Bowditch rule adjusts which quantities?", options: ["Latitudes and departures", "Map titles", "Instrument heights only", "Parcel names"], answer: 0 }
  ,{ id: "q40", topic: 3, text: "Departure represents the component in which direction?", options: ["East-west", "North-south", "Vertical", "Radial only"], answer: 0 }
  ,{ id: "q41", topic: 3, text: "Latitude in traverse computation represents which component?", options: ["North-south", "East-west", "Vertical angle", "Slope distance"], answer: 0 }
  ,{ id: "q42", topic: 3, text: "Relative precision is commonly expressed as what?", options: ["A ratio", "A colour", "A date", "A temperature"], answer: 0 }
  ,{ id: "q43", topic: 4, text: "What does JUPEM stand for in English?", options: ["Department of Survey and Mapping Malaysia", "Department of Roads Malaysia", "Land Tax Board", "National Housing Agency"], answer: 0 }
  ,{ id: "q44", topic: 4, text: "A cadastral survey primarily defines what?", options: ["Legal parcel boundaries", "Weather zones", "Road speed", "Soil chemistry"], answer: 0 }
  ,{ id: "q45", topic: 4, text: "Which office commonly handles land registration?", options: ["Land Office", "Post Office", "Health Office", "Tourism Office"], answer: 0 }
  ,{ id: "q46", topic: 4, text: "A certified plan records what?", options: ["Approved cadastral survey information", "Daily weather", "Vehicle ownership", "Exam attendance"], answer: 0 }
  ,{ id: "q47", topic: 4, text: "Licensed land surveyors are authorized to perform what?", options: ["Cadastral surveys", "Medical surveys", "Vehicle inspections", "Weather forecasts"], answer: 0 }
  ,{ id: "q48", topic: 4, text: "Land title information identifies what?", options: ["Registered interests in land", "Instrument calibration", "Rainfall totals", "Satellite orbits"], answer: 0 }
  ,{ id: "q49", topic: 4, text: "State land matters in Malaysia generally fall under whose authority?", options: ["State authority", "Airline authority", "School board", "Port operator"], answer: 0 }
  ,{ id: "q50", topic: 4, text: "A boundary mark should be protected because it provides what?", options: ["Legal survey evidence", "Weather protection", "Traffic control", "Electrical power"], answer: 0 }
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

let students = structuredClone(OFFICIAL_STUDENTS);
let quizzes = structuredClone(DEFAULT_QUIZZES);
let attempts = [];
let rules = structuredClone(DEFAULT_RULES);
const pageType = document.body.dataset.page;
const body = document.querySelector("#leaderboardBody");
const searchInput = document.querySelector("#searchInput");

function loadStudents() {
  return structuredClone(OFFICIAL_STUDENTS);
}

function normalizeScores(scores) {
  return Array.from({ length: 5 }, (_, index) => Math.max(0, Math.min(20, Number(scores?.[index]) || 0)));
}

function saveStudents() {
  const ranked = rankedStudents();
  return geoquestStore.saveLeaderboard(ranked.map((student, index) => ({ ...student, scores: normalizeScores(student.scores), rank: index + 1, total: totalOf(student), percentage: totalOf(student), badge: badgeFor(totalOf(student)), topicBadges: topicBadgesFor(student) })));
}

function connectRealtime({ includeAttempts = false } = {}) {
  geoquestStore.watchStudents(records => {
    if (records.length) students = records.map(student => ({ ...student, scores: normalizeScores(student.scores) }));
    renderLeaderboard();
    if (pageType === "quiz") initializeQuizStudentOptions();
  });
  geoquestStore.watchQuizzes(records => { if (records.length) quizzes = records; renderQuestionManager(); });
  geoquestStore.watchRules(value => { if (value) rules = { ...DEFAULT_RULES, ...value }; if (pageType === "admin") loadRulesForm(); });
  if (includeAttempts) geoquestStore.watchAttempts(records => { attempts = records; renderAttempts(); });
}

const totalOf = student => student.scores.reduce((sum, score) => sum + Number(score), 0);
const initials = name => name.split(/\s+/).slice(0, 2).map(word => word[0]).join("").toUpperCase();

function escapeHtml(value) {
  const element = document.createElement("div");
  element.textContent = value;
  return element.innerHTML;
}

function badgeFor(total) {
  if (total >= 90) return { name: "GeoQuest Master Surveyor", icon: "⌖", className: "master-surveyor", description: "Elite mastery across surveying missions." };
  if (total >= 80) return { name: "Expert Surveyor", icon: "★", className: "expert", description: "Advanced precision and technical confidence." };
  if (total >= 60) return { name: "Skilled Surveyor", icon: "▲", className: "skilled", description: "Reliable field knowledge and practical skill." };
  if (total >= 40) return { name: "Junior Surveyor", icon: "◆", className: "junior", description: "Developing competence across core topics." };
  return { name: "Survey Rookie", icon: "⬡", className: "rookie", description: "Beginning the GeoQuest surveying journey." };
}

function topicBadgesFor(student) {
  return TOPIC_BADGES.map((badge, index) => ({ ...badge, topic: index, percentage: student.scores[index] * 5, earned: student.scores[index] >= 16 }));
}

function completionStatusFor(student) {
  const completedTopics = normalizeScores(student.scores).filter(score => score > 0).length;
  return { completedTopics, totalTopics: TOPICS.length, complete: completedTopics === TOPICS.length };
}

function decorateStudentRecord(student) {
  const scores = normalizeScores(student.scores);
  const total = scores.reduce((sum, score) => sum + Number(score), 0);
  const decorated = { ...student, scores, total, percentage: total, badge: badgeFor(total) };
  decorated.topicBadges = topicBadgesFor(decorated);
  decorated.completionStatus = completionStatusFor(decorated);
  return decorated;
}

function renderTopicBadges(student, detailed = false) {
  return topicBadgesFor(student).map(badge => `<div class="topic-achievement ${badge.earned ? "earned" : "locked"}" title="${escapeHtml(badge.name)}: ${badge.percentage}%"><span class="topic-icon">${badge.earned ? badge.icon : "⌑"}</span><div><strong>${badge.name}</strong>${detailed ? `<small>${badge.earned ? badge.description : `Locked · ${badge.percentage}% of 80%`}</small>` : ""}<i><b style="width:${Math.min(100, badge.percentage / .8)}%"></b></i></div><em>${badge.earned ? "Earned" : `${badge.percentage}%`}</em></div>`).join("");
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
      <td><div class="achievement-badge"><span class="badge badge-${badge.className}">${badge.icon}</span><span><strong>${badge.name}</strong><small>${badge.description}</small></span></div></td>
      <td><div class="topic-badge-strip">${renderTopicBadges(student)}</div></td>
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

function quizStatus(message, type = "info") {
  const notice = document.querySelector("#attemptNotice");
  if (!notice) return showToast(message);
  notice.textContent = message;
  notice.classList.remove("success", "error");
  notice.classList.add(type);
}

function initializeStudentPage() {
  renderLeaderboard();
  connectRealtime();
  searchInput?.addEventListener("input", renderLeaderboard);
  document.querySelector("#topTenToggle")?.addEventListener("change", renderLeaderboard);
}

function initializeAdminPage() {
  const pinGate = document.querySelector("#pinGate");
  const adminApp = document.querySelector("#adminApp");
  const pinForm = document.querySelector("#pinForm");
  const pinInput = document.querySelector("#pinInput");
  const emailInput = document.querySelector("#lecturerEmail");
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

  lecturerAuth.observe(async user => {
    if (lecturerAuth.isLecturer(user)) {
      unlockAdmin();
      connectRealtime({ includeAttempts: true });
      try {
        const seedStudents = OFFICIAL_STUDENTS.map((student, index) => ({ ...student, rank: index + 1, total: 0, percentage: 0, badge: badgeFor(0), topicBadges: topicBadgesFor(student) }));
        const seedBadges = [
          { id: "overall-rookie", type: "overall", minPercentage: 0, maxPercentage: 39, ...badgeFor(0) },
          { id: "overall-junior", type: "overall", minPercentage: 40, maxPercentage: 59, ...badgeFor(40) },
          { id: "overall-skilled", type: "overall", minPercentage: 60, maxPercentage: 79, ...badgeFor(60) },
          { id: "overall-expert", type: "overall", minPercentage: 80, maxPercentage: 89, ...badgeFor(80) },
          { id: "overall-master", type: "overall", minPercentage: 90, maxPercentage: 100, ...badgeFor(90) },
          ...TOPIC_BADGES.map((badge, index) => ({ id: `topic-${index + 1}`, type: "topic", topic: index, threshold: 80, ...badge }))
        ];
        const seeded = await geoquestStore.seed({ students: seedStudents, quizzes: DEFAULT_QUIZZES, rules: DEFAULT_RULES, badges: seedBadges });
        if (seeded) showToast("Firebase database initialized successfully.");
      } catch (error) {
        showToast(error.code === "permission-denied" ? "Login succeeded, but Firestore lecturer permission was denied." : "Login succeeded, but Firebase data initialization failed.");
        console.error("GeoQuest Firebase initialization:", error);
      }
    }
  });

  pinForm.addEventListener("submit", async event => {
    event.preventDefault();
    try { await lecturerAuth.signIn(emailInput.value.trim(), pinInput.value); pinError.textContent = ""; }
    catch (error) {
      const messages = { "auth/invalid-credential": "Email atau kata laluan tidak sah.", "auth/user-not-found": "Akaun pensyarah tidak ditemui.", "auth/wrong-password": "Kata laluan tidak sah.", "auth/too-many-requests": "Terlalu banyak percubaan. Cuba lagi kemudian.", "auth/unauthorized-domain": "Domain GitHub Pages belum dibenarkan dalam Firebase Authentication." };
      pinError.textContent = messages[error.code] || `Log masuk gagal: ${error.code || "ralat Firebase"}`;
      pinInput.value = "";
      pinInput.focus();
    }
  });

  document.querySelector("#logoutButton").addEventListener("click", async () => {
    await lecturerAuth.signOut();
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
  document.querySelector("#addStudent").addEventListener("click", addStudent);
  document.querySelector("#deleteSelected").addEventListener("click", deleteSelectedStudent);
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

async function addStudent() {
  const id = document.querySelector("#newStudentId").value.trim().toUpperCase();
  const name = document.querySelector("#newStudentName").value.trim().toUpperCase();
  if (!id || !name) return showToast("Enter the matrix number and full name.");
  if (students.some(student => student.id === id)) return showToast("That matrix number already exists.");
  students.push({ id, name, className: "DGU1B", scores: [0, 0, 0, 0, 0] });
  await saveStudents();
  document.querySelector("#newStudentId").value = "";
  document.querySelector("#newStudentName").value = "";
  syncStudentOptions(); renderLeaderboard(); showToast(`${name} was added.`);
}

async function deleteSelectedStudent() {
  const id = document.querySelector("#studentName").value;
  const student = students.find(item => item.id === id);
  if (!student) return showToast("Select a student first.");
  if (!confirm(`Delete ${student.name} from the leaderboard?`)) return;
  await geoquestStore.deleteStudent(id);
  students = students.filter(item => item.id !== id);
  syncStudentOptions(); renderLeaderboard(); showToast("Student deleted.");
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
  geoquestStore.saveQuiz(quizzes[quizzes.length - 1]);
  event.target.reset(); renderQuestionManager(); showToast("Quiz question added.");
}

function deleteQuestion(event) {
  const button = event.target.closest("[data-question-id]");
  if (!button || !confirm("Delete this quiz question?")) return;
  quizzes = quizzes.filter(question => question.id !== button.dataset.questionId);
  geoquestStore.deleteQuiz(button.dataset.questionId); renderQuestionManager(); showToast("Question deleted.");
}

function loadRulesForm() {
  document.querySelector("#pointsPerCorrect").value = rules.pointsPerCorrect;
  document.querySelector("#maxAttempts").value = rules.maxAttempts;
  document.querySelector("#passPercentage").value = rules.passPercentage;
  document.querySelector("#attemptRule").value = rules.attemptRule || "highest";
}

function saveRules(event) {
  event.preventDefault();
  rules = { pointsPerCorrect: Number(document.querySelector("#pointsPerCorrect").value), maxAttempts: Number(document.querySelector("#maxAttempts").value), passPercentage: Number(document.querySelector("#passPercentage").value), attemptRule: document.querySelector("#attemptRule").value };
  geoquestStore.saveRules(rules); showToast("Scoring rules saved.");
}

function renderAttempts() {
  const attemptBody = document.querySelector("#attemptBody");
  if (!attemptBody) return;
  attemptBody.innerHTML = [...attempts].reverse().map(attempt => `<tr><td>${new Date(attempt.date).toLocaleString()}</td><td><strong>${escapeHtml(attempt.studentName)}</strong><small class="table-sub">${attempt.studentId}</small></td><td>Topic ${attempt.topic + 1}</td><td>${attempt.correct}/${attempt.total}</td><td>${attempt.percentage}%</td><td><span class="status-pill ${attempt.passed ? "passed" : "retry"}">${attempt.passed ? "Passed" : "Retry"}</span></td></tr>`).join("");
  document.querySelector("#attemptEmpty").hidden = attempts.length > 0;
}

function clearAttempts() {
  if (!attempts.length || !confirm("Clear all recorded quiz attempts?")) return;
  attempts = []; geoquestStore.clearAttempts(); renderAttempts(); showToast("Attempt history cleared.");
}

function initializeQuizPage() {
  studentAuth.ensure().then(() => connectRealtime()).catch(() => showToast("Firebase student access is not enabled yet."));
  initializeQuizStudentOptions();
  document.querySelector("#quizTopic").innerHTML = topicOptions();
  document.querySelector("#loadQuiz").addEventListener("click", loadQuiz);
  document.querySelector("#quizForm").addEventListener("submit", submitQuiz);
  document.querySelector("#retryQuiz").addEventListener("click", () => { document.querySelector("#resultPanel").hidden = true; document.querySelector("#quizPanel").hidden = true; });
}

function initializeQuizStudentOptions() {
  const studentSelect = document.querySelector("#quizStudent");
  if (!studentSelect) return;
  const selected = studentSelect.value;
  studentSelect.innerHTML = `<option value="">Select your name</option>${students.map(student => `<option value="${student.id}">${student.id} — ${escapeHtml(student.name)}</option>`).join("")}`;
  if (students.some(student => student.id === selected)) studentSelect.value = selected;
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

async function submitQuiz(event) {
  event.preventDefault();
  const submitButton = event.submitter || document.querySelector(".quiz-submit");
  const studentSelect = document.querySelector("#quizStudent");
  const studentId = studentSelect.value;
  const topic = Number(document.querySelector("#quizTopic").value);
  const topicQuestions = quizzes.filter(question => question.topic === topic);
  const student = students.find(item => item.id === studentId);
  const selectedLabel = studentSelect.selectedOptions[0]?.textContent || "";
  if (!student || student.id !== studentId || !selectedLabel.includes(student.name)) {
    return quizStatus("Selected student name and matrix number do not match an existing student record.", "error");
  }
  if (!topicQuestions.length) return quizStatus("No questions are available for this topic.", "error");
  const selectedSignature = topicQuestions.map(question => {
    const selected = document.querySelector(`input[name="answer-${question.id}"]:checked`);
    return selected?.value ?? "x";
  }).join("");
  const submissionKey = `${studentId}-${topic}-${selectedSignature}`;
  const previousSubmission = JSON.parse(sessionStorage.getItem("geoquest-last-submission") || "null");
  if (previousSubmission?.key === submissionKey && Date.now() - previousSubmission.time < 30000) return showToast("This submission was already received.");

  let correct = 0;
  const answers = topicQuestions.map(question => {
    const choice = document.querySelector(`input[name="answer-${question.id}"]:checked`);
    const selected = Number(choice?.value);
    const correctAnswer = Number(question.answer);
    const isCorrect = selected === correctAnswer;
    if (isCorrect) correct++;
    return { questionId: question.id, selected, correctAnswer, isCorrect };
  });
  const percentage = Math.round((correct / topicQuestions.length) * 100);
  const attempt = { date: new Date().toISOString(), studentId, studentName: student.name, topic, topicName: TOPIC_NAMES[topic], answers, correct, incorrect: topicQuestions.length - correct, total: topicQuestions.length, points: correct * rules.pointsPerCorrect, scoreOutOfTen: correct, percentage, passed: percentage >= rules.passPercentage };
  const topicAttempts = [...attempts, attempt].filter(item => item.studentId === studentId && item.topic === topic);
  let scoringAttempt = topicAttempts[topicAttempts.length - 1];
  if (rules.attemptRule === "first") scoringAttempt = topicAttempts[0];
  if (rules.attemptRule === "highest") scoringAttempt = topicAttempts.reduce((best, item) => item.percentage > best.percentage ? item : best, topicAttempts[0]);

  const badgeWasEarned = student.scores[topic] >= 16;
  const updatedStudent = decorateStudentRecord({ ...student, scores: normalizeScores(student.scores).map((score, index) => index === topic ? Math.round(scoringAttempt.percentage / 5) : score) });
  const previewRank = [...students.filter(item => item.id !== updatedStudent.id), updatedStudent].sort((a, b) => totalOf(b) - totalOf(a) || a.name.localeCompare(b.name)).findIndex(item => item.id === updatedStudent.id) + 1;
  const ranking = { studentId: updatedStudent.id, name: updatedStudent.name, rank: previewRank, total: updatedStudent.total, percentage: updatedStudent.percentage, badge: updatedStudent.badge };

  try {
    if (submitButton) submitButton.disabled = true;
    quizStatus("Saving quiz score...", "info");
    const savedAttempt = await geoquestStore.submitAttempt({ attempt, student: updatedStudent, ranking });
    attempts.push(savedAttempt);
    students = students.map(item => item.id === updatedStudent.id ? updatedStudent : item);
    sessionStorage.setItem("geoquest-last-submission", JSON.stringify({ key: submissionKey, time: Date.now() }));
    const badgeNowEarned = updatedStudent.scores[topic] >= 16;
    document.querySelector("#quizPanel").hidden = true;
    document.querySelector("#resultPanel").hidden = false;
    const overallBadge = badgeFor(totalOf(updatedStudent));
    document.querySelector("#resultContent").innerHTML = `<div class="result-score ${attempt.passed ? "passed" : "retry"}"><strong>${percentage}%</strong><span>${attempt.passed ? "Completed - Passed" : "Completed - More practice required"}</span></div><div class="result-details"><p><span>Number correct</span><strong>${correct}</strong></p><p><span>Number incorrect</span><strong>${attempt.incorrect}</strong></p><p><span>Score out of 10</span><strong>${correct} / ${topicQuestions.length}</strong></p><p><span>Percentage</span><strong>${percentage}%</strong></p><p><span>Recorded topic score</span><strong>${updatedStudent.scores[topic]} / 20</strong></p></div><div class="quiz-achievement badge-${overallBadge.className}"><span class="achievement-icon">${overallBadge.icon}</span><div><small>Overall achievement</small><strong>${overallBadge.name}</strong><p>${overallBadge.description}</p></div></div><div class="quiz-topic-badges">${renderTopicBadges(updatedStudent, true)}</div><p class="scoring-note success">Score saved successfully.</p><p class="scoring-note">Recorded using the <strong>${rules.attemptRule || "highest"} attempt</strong> rule.</p>`;
    quizStatus("Score saved successfully.", "success");
    showToast("Score saved successfully.");
    if (!badgeWasEarned && badgeNowEarned) celebrateTopicBadge(TOPIC_BADGES[topic]);
  } catch (error) {
    const message = `${error.code || "firebase/error"}: ${error.message || "Quiz score could not be saved."}`;
    quizStatus(message, "error");
    document.querySelector("#resultPanel").hidden = false;
    document.querySelector("#resultContent").innerHTML = `<div class="result-score retry"><strong>Save failed</strong><span>Firebase rejected the quiz submission</span></div><p class="scoring-note error">${escapeHtml(message)}</p>`;
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
}

function celebrateTopicBadge(badge) {
  const celebration = document.createElement("div");
  celebration.className = "badge-celebration";
  celebration.innerHTML = `<div><span>${badge.icon}</span><small>New topic badge earned</small><strong>${badge.name}</strong></div>${Array.from({ length: 12 }, (_, index) => `<i style="--i:${index}"></i>`).join("")}`;
  document.body.appendChild(celebration);
  setTimeout(() => celebration.remove(), 2800);
}

if (pageType === "admin") initializeAdminPage();
else if (pageType === "quiz") initializeQuizPage();
else initializeStudentPage();
