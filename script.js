const TOPICS = ["topic1", "topic2", "topic3", "topic4", "topic5"];
const STORAGE_KEY = "geoquest-dcg10263-dgu1b-roster-v1";

const sampleStudents = [
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
let editingId = null;
let inlineEditingId = null;

const form = document.querySelector("#scoreForm");
const body = document.querySelector("#leaderboardBody");
const searchInput = document.querySelector("#searchInput");
const topTenToggle = document.querySelector("#topTenToggle");

function loadStudents() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) && saved.length ? saved : structuredClone(sampleStudents);
  } catch { return structuredClone(sampleStudents); }
}

function saveStudents() { localStorage.setItem(STORAGE_KEY, JSON.stringify(students)); }
const totalOf = student => student.scores.reduce((sum, score) => sum + Number(score), 0);
const initials = name => name.split(/\s+/).slice(0, 2).map(word => word[0]).join("").toUpperCase();

function syncStudentOptions() {
  const select = document.querySelector("#studentName");
  const selectedId = select.value;
  select.innerHTML = `<option value="">Select a student</option>${[...students]
    .sort((a, b) => String(a.id).localeCompare(String(b.id)))
    .map(student => `<option value="${escapeHtml(String(student.id))}">${escapeHtml(String(student.id))} — ${escapeHtml(student.name)}</option>`)
    .join("")}`;
  if (students.some(student => String(student.id) === selectedId)) select.value = selectedId;
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

function render() {
  syncStudentOptions();
  const ranked = rankedStudents();
  const query = searchInput.value.trim().toLowerCase();
  let visible = ranked.map((student, index) => ({ ...student, rank: index + 1 }));
  if (topTenToggle.checked) visible = visible.slice(0, 10);
  if (query) visible = visible.filter(student => student.name.toLowerCase().includes(query));

  body.innerHTML = visible.map(student => {
    const total = totalOf(student);
    const badge = badgeFor(total);
    const isEditing = String(student.id) === String(inlineEditingId);
    if (isEditing) return `<tr class="editing-row">
      <td><span class="rank">#${student.rank}</span></td>
      <td><div class="student-cell editing-student"><span class="avatar table-avatar">${initials(student.name)}</span><div><strong>${escapeHtml(student.name)}</strong><small>${escapeHtml(String(student.id))} · DGU1B</small></div></div></td>
      ${student.scores.map((score, index) => `<td><label class="inline-field score-edit"><span class="sr-only">Topic ${index + 1} score</span><input class="inline-score" type="number" value="${score}" min="0" max="20" aria-label="Topic ${index + 1} score"><small>/20</small></label></td>`).join("")}
      <td class="edit-guidance" colspan="3"><strong>Edit mode</strong><small>Scores must be between 0 and 20.</small></td>
      <td class="row-actions"><button class="row-btn save-row" data-save="${student.id}">Save</button><button class="row-btn cancel-row" data-cancel="${student.id}">Cancel</button></td>
    </tr>`;
    return `<tr>
      <td><span class="rank">#${student.rank}</span></td>
      <td><div class="student-cell"><span class="avatar table-avatar">${initials(student.name)}</span><div><strong>${escapeHtml(student.name)}</strong><small>${escapeHtml(String(student.id))} · ${escapeHtml(student.className || "DGU1B")}</small></div></div></td>
      ${student.scores.map(score => `<td>${score}</td>`).join("")}
      <td class="progress-cell"><div class="progress-label"><span>Completion</span><span>${total}%</span></div><div class="progress-track"><i style="width:${total}%"></i></div></td>
      <td class="total-cell"><strong>${total}</strong><small>${total}%</small></td>
      <td><span class="badge badge-${badge.className}">${badge.icon}</span><span class="badge-name">${badge.name}</span></td>
      <td class="row-actions"><button class="row-btn edit-row" data-edit="${student.id}" aria-label="Edit ${escapeHtml(student.name)}">Edit</button><button class="row-btn delete-row" data-delete="${student.id}" aria-label="Delete ${escapeHtml(student.name)}">Delete</button></td>
    </tr>`;
  }).join("");

  document.querySelector("#emptyState").hidden = visible.length > 0;
  document.querySelector("#studentCount").textContent = students.length;
  const totals = students.map(totalOf);
  document.querySelector("#classAverage").textContent = `${totals.length ? Math.round(totals.reduce((a,b)=>a+b,0)/totals.length) : 0}%`;
  document.querySelector("#topScore").textContent = totals.length ? Math.max(...totals) : 0;
  renderPodium(ranked.slice(0, 3));
}

function renderPodium(top) {
  document.querySelector("#podium").innerHTML = top.map((student, index) => `<article class="podium-card"><span class="podium-rank">${["①","②","③"][index]}</span><span class="avatar">${initials(student.name)}</span><div class="podium-info"><strong>${escapeHtml(student.name)}</strong><small>${badgeFor(totalOf(student)).name}</small></div><span class="podium-score">${totalOf(student)}</span></article>`).join("");
}

function updatePreview() {
  const total = TOPICS.reduce((sum, id) => sum + (Number(document.querySelector(`#${id}`).value) || 0), 0);
  document.querySelector("#previewTotal").textContent = total;
  document.querySelector("#previewBar").style.width = `${Math.min(total, 100)}%`;
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const studentId = document.querySelector("#studentName").value;
  const scores = TOPICS.map(id => Number(document.querySelector(`#${id}`).value));
  if (!studentId) return showToast("Select a student first.");
  if (scores.some(score => score < 0 || score > 20 || !Number.isFinite(score))) return showToast("Enter scores from 0 to 20.");
  const student = students.find(item => String(item.id) === studentId);
  if (!student) return showToast("The selected student could not be found.");
  student.scores = scores;
  showToast(`${student.name}'s score was updated.`);
  saveStudents(); resetForm(); render();
});

body.addEventListener("click", event => {
  const editButton = event.target.closest("[data-edit]");
  const saveButton = event.target.closest("[data-save]");
  const cancelButton = event.target.closest("[data-cancel]");
  const deleteButton = event.target.closest("[data-delete]");
  if (editButton) {
    inlineEditingId = editButton.dataset.edit;
    render();
    body.querySelector(".inline-score")?.focus();
  }
  if (saveButton) {
    const id = saveButton.dataset.save;
    const row = saveButton.closest("tr");
    const scores = [...row.querySelectorAll(".inline-score")].map(input => Number(input.value));
    if (scores.some(score => !Number.isFinite(score) || score < 0 || score > 20)) return showToast("Each score must be between 0 and 20.");
    const student = students.find(item => String(item.id) === id);
    if (student) student.scores = scores;
    inlineEditingId = null;
    saveStudents(); render(); showToast(`${student.name}'s scores were saved.`);
  }
  if (cancelButton) {
    inlineEditingId = null;
    render();
  }
  if (deleteButton) {
    const id = deleteButton.dataset.delete;
    const student = students.find(item => String(item.id) === id);
    if (student && confirm(`Remove ${student.name} from the leaderboard?`)) {
      inlineEditingId = null;
      students = students.filter(item => String(item.id) !== id); saveStudents(); render(); showToast("Surveyor removed.");
    }
  }
});

function resetForm() {
  form.reset(); editingId = null;
  TOPICS.forEach(id => document.querySelector(`#${id}`).value = 0);
  document.querySelector("#submitButton").textContent = "＋ Add to leaderboard";
  updatePreview();
}

document.querySelector("#resetData").addEventListener("click", () => {
  if (!confirm("Reset all five topic scores to zero for every student?")) return;
  students = students.map(student => ({ ...student, scores: [0, 0, 0, 0, 0] }));
  saveStudents(); resetForm(); render(); showToast("All student scores were reset to zero.");
});

document.querySelector("#studentName").addEventListener("change", event => {
  const student = students.find(item => String(item.id) === event.target.value);
  TOPICS.forEach((id, index) => document.querySelector(`#${id}`).value = student ? student.scores[index] : 0);
  updatePreview();
});

function escapeHtml(value) { const element = document.createElement("div"); element.textContent = value; return element.innerHTML; }
function showToast(message) { const toast = document.querySelector("#toast"); toast.textContent = message; toast.classList.add("show"); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600); }

TOPICS.forEach(id => document.querySelector(`#${id}`).addEventListener("input", updatePreview));
searchInput.addEventListener("input", render);
topTenToggle.addEventListener("change", render);
body.addEventListener("keydown", event => {
  if (!event.target.closest(".editing-row")) return;
  if (event.key === "Escape") { inlineEditingId = null; render(); }
  if (event.key === "Enter") { event.preventDefault(); event.target.closest("tr").querySelector("[data-save]").click(); }
});
updatePreview();
render();
