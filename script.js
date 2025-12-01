// === CONFIG ===
const EXAM_DATE = new Date("2026-01-08T00:00:00");
const START_TIME = "05:00";
const END_TIME = "22:30";
const SLOT_MINUTES = 30;
const GERMAN_TARGET_MIN = 240;

// === FOCUS (C2 weekly pattern) ===
function getFocusForDate(date) {
  const d = date.getDay();
  switch (d) {
    case 1:
      return "Listening";
    case 2:
      return "Speaking";
    case 3:
      return "Reading";
    case 4:
      return "Grammar & Vocabulary";
    case 5:
      return "Writing";
    case 6:
      return "Mock Test & Review";
    case 0:
    default:
      return "Light Review & Rest";
  }
}

// === GERMAN TASK TEMPLATES ===
const GERMAN_FOCUS_TASKS = {
  Listening: {
    GERMAN_MORNING_1:
      "Listening: 20 min A1–B1 dialogues. Note 10 new words/phrases.",
    GERMAN_MORNING_2:
      "Listening: Shadow (repeat aloud) key sentences from the audio.",
    GERMAN_DEEP_1:
      "Listening: TELC B1 sample audio with tasks. Do exercise and check solutions.",
    GERMAN_DEEP_2:
      "Listening: Write 3–4 German sentences summarising what you heard.",
    GERMAN_LIGHT:
      "Listening: Easy podcast / YouTube (German), relax and absorb sound.",
    GERMAN_EVENING_1:
      "Listening: Replay difficult parts from morning and repeat them slowly.",
    GERMAN_EVENING_2:
      "Pronunciation: imitate speaker, focus on rhythm and melody.",
    GERMAN_REVIEW:
      "Review: list important phrases from today and read them aloud twice."
  },
  Speaking: {
    GERMAN_MORNING_1:
      "Speaking: 2-min monologues (Introduce yourself, your day, your exam goal).",
    GERMAN_MORNING_2:
      "Speaking: Answer 5 simple TELC-style questions aloud. Repeat twice.",
    GERMAN_DEEP_1:
      "Speaking: Describe 2 pictures (B1 style) – 1 min each, record yourself.",
    GERMAN_DEEP_2:
      "Speaking: Simulate short dialogues (at pharmacy / supermarket).",
    GERMAN_LIGHT:
      "Speaking: Talk to yourself in German while walking or pacing.",
    GERMAN_EVENING_1:
      "Speaking: Repeat today's best sentences and improve them.",
    GERMAN_EVENING_2:
      "Speaking: Focus on difficult sounds (ch, r, umlauts).",
    GERMAN_REVIEW:
      "Review: write 5 good sentences you spoke today and read them aloud."
  },
  Reading: {
    GERMAN_MORNING_1:
      "Reading: short texts (A2–B1). Underline unknown words.",
    GERMAN_MORNING_2:
      "Reading: re-read text; guess meaning from context, then translate key words.",
    GERMAN_DEEP_1:
      "Reading: TELC B1 sample reading part. Do tasks under time pressure.",
    GERMAN_DEEP_2:
      "Reading: mark connectors (weil, obwohl, damit, deshalb...).",
    GERMAN_LIGHT:
      "Reading: easy news or graded reader, slow and relaxed.",
    GERMAN_EVENING_1:
      "Reading: revisit one text and read aloud for pronunciation.",
    GERMAN_EVENING_2:
      "Vocabulary: create mini list from reading and repeat.",
    GERMAN_REVIEW:
      "Review: summarise one text in 3 simple German sentences."
  },
  "Grammar & Vocabulary": {
    GERMAN_MORNING_1:
      "Grammar: 30 min focused on a topic (word order, cases, prepositions...).",
    GERMAN_MORNING_2:
      "Exercises: 15–30 written examples using today's grammar.",
    GERMAN_DEEP_1:
      "Grammar: TELC-style gap-fill exercises. Check answers carefully.",
    GERMAN_DEEP_2:
      "Vocabulary: 15–20 key words on flashcards (active recall).",
    GERMAN_LIGHT:
      "Quick review: articles + endings drill (der/die/das, Akk/Dat).",
    GERMAN_EVENING_1:
      "Grammar: write 5–8 sentences using today's structure.",
    GERMAN_EVENING_2:
      "Error hunt: correct your own sentences, improve 1 level.",
    GERMAN_REVIEW:
      "Review: short notes summarising today's grammar & vocab."
  },
  Writing: {
    GERMAN_MORNING_1:
      "Writing: one TELC B1 email (informal). Focus on structure.",
    GERMAN_MORNING_2:
      "Writing: check and correct the same email. Improve connectors.",
    GERMAN_DEEP_1:
      "Writing: one formal letter / complaint / request (TELC style).",
    GERMAN_DEEP_2:
      "Writing: count words, check for greeting, ending, paragraphs.",
    GERMAN_LIGHT:
      "Writing: 5–8 simple sentences about your day in German.",
    GERMAN_EVENING_1:
      "Writing: rewrite 3 weak sentences to better versions.",
    GERMAN_EVENING_2:
      "Copy useful sentences from models into your notebook.",
    GERMAN_REVIEW:
      "Review: write 3 things you improved in your writing today."
  }
};

function expandGermanTemplate(templateKey, focusLabel) {
  const focusSet = GERMAN_FOCUS_TASKS[focusLabel];
  if (focusSet && focusSet[templateKey]) {
    return focusSet[templateKey];
  }

  // Fallback generic descriptions
  switch (templateKey) {
    case "GERMAN_MORNING_1":
      return `${focusLabel}: main morning practice block – 30 minutes.`;
    case "GERMAN_MORNING_2":
      return `${focusLabel}: continue morning practice, repeat difficult parts.`;
    case "GERMAN_DEEP_1":
      return `${focusLabel}: deep 30-min exam-style practice.`;
    case "GERMAN_DEEP_2":
      return `${focusLabel}: reflect, correct, and summarise what you practised.`;
    case "GERMAN_LIGHT":
      return `${focusLabel}: light, low-pressure German time.`;
    case "GERMAN_EVENING_1":
      return `${focusLabel}: evening consolidation – repeat key material.`;
    case "GERMAN_EVENING_2":
      return `${focusLabel}: short extra practice if you still have energy.`;
    case "GERMAN_REVIEW":
      return `${focusLabel}: review the most important things from today.`;
    default:
      return `${focusLabel}: free practice block – choose any useful activity.`;
  }
}

// === BASE DAILY PLAN ===
const BASE_PLAN = {
  "05:00": {
    category: "mind",
    template: "Wake up, drink water, light stretching."
  },
  "05:30": {
    category: "mind",
    template: "Breathing & meditation (5–15 min, focus on exam goal)."
  },
  "06:00": { category: "german", template: "GERMAN_MORNING_1" },
  "06:30": { category: "german", template: "GERMAN_MORNING_2" },
  "07:00": {
    category: "planning",
    template: "Shower & get ready – mentally review plan."
  },
  "07:30": {
    category: "break",
    template: "Breakfast (no news, no scrolling – just eat calmly)."
  },
  "08:00": { category: "work", template: "Work / deep focus block #1." },
  "08:30": { category: "work", template: "Work / deep focus block #1 (continue)." },
  "09:00": { category: "german", template: "GERMAN_DEEP_1" },
  "09:30": { category: "german", template: "GERMAN_DEEP_2" },
  "10:00": { category: "work", template: "Work block #2." },
  "10:30": { category: "work", template: "Work block #2 (continue)." },
  "11:00": { category: "work", template: "Work / tasks / calls." },
  "11:30": {
    category: "break",
    template: "Short walk / tea / pause eyes from screen."
  },
  "12:00": {
    category: "break",
    template: "Light tasks / prepare for lunch."
  },
  "12:30": {
    category: "break",
    template: "Lunch – slow eating, no phone."
  },
  "13:00": {
    category: "break",
    template: "Short walk / rest."
  },
  "13:30": { category: "german", template: "GERMAN_LIGHT" },
  "14:00": { category: "work", template: "Work block #3." },
  "14:30": { category: "work", template: "Work block #3 (continue)." },
  "15:00": { category: "work", template: "Work block #4." },
  "15:30": { category: "work", template: "Work block #4 (continue)." },
  "16:00": {
    category: "work",
    template: "Admin / small tasks / messages."
  },
  "16:30": {
    category: "break",
    template: "Short walk, stretching, reset body and mind."
  },
  "17:00": {
    category: "mind",
    template: "Exercise / walk – move body, reduce stress."
  },
  "17:30": {
    category: "mind",
    template: "Exercise / walk – continue, light sweating is okay."
  },
  "18:00": {
    category: "mind",
    template: "Cool-down, breathing, water."
  },
  "18:30": {
    category: "break",
    template: "Relax, family, light conversation."
  },
  "19:00": { category: "german", template: "GERMAN_EVENING_1" },
  "19:30": { category: "german", template: "GERMAN_EVENING_2" },
  "20:00": {
    category: "break",
    template: "Dinner – calm, no heavy multitasking."
  },
  "20:30": {
    category: "break",
    template: "Family / relax / screen time in moderation."
  },
  "21:00": { category: "german", template: "GERMAN_REVIEW" },
  "21:30": {
    category: "mind",
    template: "Daily reflection + short journal (3–5 lines)."
  },
  "22:00": {
    category: "mind",
    template: "Wind-down: light reading / stretching, no bright screens."
  },
  "22:30": {
    category: "mind",
    template: "Sleep prep – lights out, phone away."
  }
};

// === HELPERS ===
function formatTime(date) {
  return date.toTimeString().slice(0, 5);
}

function generateTimeSlots(startStr, endStr, stepMinutes) {
  const [sh, sm] = startStr.split(":").map(Number);
  const [eh, em] = endStr.split(":").map(Number);

  const slots = [];
  const d = new Date();
  d.setHours(sh, sm, 0, 0);

  const end = new Date();
  end.setHours(eh, em, 0, 0);

  while (d <= end) {
    slots.push(formatTime(d));
    d.setMinutes(d.getMinutes() + stepMinutes);
  }
  return slots;
}

function getDateKey(date) {
  return date.toISOString().slice(0, 10); // yyyy-mm-dd
}

function formatDateDDMMYYYY(date) {
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

function loadDayData(dateKey) {
  const raw = localStorage.getItem("focusPlanner_" + dateKey);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveDayData(dateKey, data) {
  localStorage.setItem("focusPlanner_" + dateKey, JSON.stringify(data));
}

// === DOM REFS ===
const daysRemainingEl = document.getElementById("daysRemaining");
const focusLabelEl = document.getElementById("focusLabel");
const datePickerEl = document.getElementById("datePicker");
const todayBtn = document.getElementById("todayBtn");
const resetPlanBtn = document.getElementById("resetPlanBtn");
const clearDayBtn = document.getElementById("clearDayBtn");
const generateReportBtn = document.getElementById("generateReportBtn");
const exportCsvBtn = document.getElementById("exportCsvBtn");
const exportXlsxBtn = document.getElementById("exportXlsxBtn");
const exportPdfBtn = document.getElementById("exportPdfBtn");

const timelineBodyEl = document.getElementById("timelineBody");
const totalSlotsEl = document.getElementById("totalSlots");
const completedSlotsEl = document.getElementById("completedSlots");
const focusScoreEl = document.getElementById("focusScore");
const executionScoreEl = document.getElementById("executionScore");
const germanMinutesEl = document.getElementById("germanMinutes");
const reportOutputEl = document.getElementById("reportOutput");
const germanProgressBarEl = document.getElementById("germanProgressBar");
const germanProgressTextEl = document.getElementById("germanProgressText");

let currentDate = new Date();
const timeSlots = generateTimeSlots(START_TIME, END_TIME, SLOT_MINUTES);
let slotState = {}; // { "05:00": { status, task, category } }

// === INIT ===
function updateDaysRemaining() {
  const today = new Date();
  const diffMs = EXAM_DATE - new Date(today.toDateString());
  const diffDays = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  daysRemainingEl.textContent = diffDays.toString();
}

function updateFocusLabelUI() {
  const label = getFocusForDate(currentDate);
  focusLabelEl.textContent = label;
}

function renderDatePicker() {
  const key = getDateKey(currentDate);
  datePickerEl.value = key;
}

function createTimelineRows() {
  timelineBodyEl.innerHTML = "";
  timeSlots.forEach((time) => {
    const row = document.createElement("div");
    row.className = "timeline-row";

    const timeCol = document.createElement("div");
    timeCol.className = "slot-time";
    timeCol.textContent = time;

    const statusCol = document.createElement("div");
    statusCol.className = "slot-status";
    const select = document.createElement("select");
    select.innerHTML = `
      <option value="">–</option>
      <option value="planned">Planned</option>
      <option value="done">Done</option>
      <option value="missed">Missed</option>
      <option value="german">German (completed)</option>
    `;
    statusCol.appendChild(select);

    const taskCol = document.createElement("div");
    taskCol.className = "slot-task";
    const textarea = document.createElement("textarea");
    textarea.placeholder = "Task or notes for this slot…";
    taskCol.appendChild(textarea);

    row.appendChild(timeCol);
    row.appendChild(statusCol);
    row.appendChild(taskCol);
    timelineBodyEl.appendChild(row);

    select.addEventListener("change", () => {
      updateSlotState(time, select.value, textarea.value);
    });
    textarea.addEventListener("input", () => {
      updateSlotState(time, select.value, textarea.value);
    });
  });
}

function buildDefaultDayStateForDate(date) {
  const focusLabel = getFocusForDate(date);
  const state = {};
  timeSlots.forEach((time) => {
    const base = BASE_PLAN[time];
    let category = "";
    let task = "";
    let status = "";

    if (base) {
      category = base.category || "";
      if (category === "german") {
        task = expandGermanTemplate(base.template, focusLabel);
        status = "planned";
      } else {
        task = base.template || "";
        status = task ? "planned" : "";
      }
    }

    state[time] = { status, task, category };
  });
  return state;
}

function loadCurrentDayFromStorage() {
  const key = getDateKey(currentDate);
  const data = loadDayData(key);

  if (!data || !data.slots || Object.keys(data.slots).length === 0) {
    slotState = buildDefaultDayStateForDate(currentDate);
    saveDayData(key, { slots: slotState });
  } else {
    slotState = data.slots || {};
  }

  applyStateToUI();
  updateSummary();
}

function applyStateToUI() {
  const rows = Array.from(
    timelineBodyEl.getElementsByClassName("timeline-row")
  );
  rows.forEach((row) => {
    const time = row.querySelector(".slot-time").textContent;
    const select = row.querySelector("select");
    const textarea = row.querySelector("textarea");

    const baseCategory = BASE_PLAN[time] ? BASE_PLAN[time].category : "";
    const slot = slotState[time] || {};

    if (!slot.category && baseCategory) {
      slot.category = baseCategory;
      slotState[time] = slot;
    }

    select.value = slot.status || "";
    textarea.value = slot.task || "";

    const cat = slot.category || "";
    row.dataset.category = cat;
    row.classList.remove(
      "cat-german",
      "cat-work",
      "cat-break",
      "cat-mind",
      "cat-planning"
    );
    if (cat) {
      row.classList.add("cat-" + cat);
    }
  });
}

function updateSlotState(time, status, task) {
  const existing = slotState[time] || {};
  const baseCategory = BASE_PLAN[time] ? BASE_PLAN[time].category : "";
  const category = existing.category || baseCategory || "";
  slotState[time] = { status, task, category };
  const key = getDateKey(currentDate);
  saveDayData(key, { slots: slotState });
  applyStateToUI();
  updateSummary();
}

function updateSummary() {
  const total = timeSlots.length;
  let completed = 0;
  let germanSlotsDone = 0;

  timeSlots.forEach((t) => {
    const slot = slotState[t];
    if (!slot) return;
    const status = slot.status || "";
    const category =
      slot.category || (BASE_PLAN[t] && BASE_PLAN[t].category) || "";

    if (status === "done" || status === "german") completed++;
    if (category === "german" && (status === "done" || status === "german")) {
      germanSlotsDone++;
    }
  });

  const completionRatio = total > 0 ? completed / total : 0;
  const germanMinutes = germanSlotsDone * SLOT_MINUTES;
  const focusScore = Math.round(completionRatio * 10); // mind: how consistently you follow
  const executionRatio = Math.min(1, germanMinutes / GERMAN_TARGET_MIN);
  const executionScore = Math.round(executionRatio * 10); // action: German vs target

  totalSlotsEl.textContent = total.toString();
  completedSlotsEl.textContent = completed.toString();
  focusScoreEl.textContent = focusScore.toString();
  executionScoreEl.textContent = executionScore.toString();
  germanMinutesEl.textContent = germanMinutes.toString();

  const percent = Math.max(
    0,
    Math.min(100, Math.round((germanMinutes / GERMAN_TARGET_MIN) * 100))
  );
  germanProgressBarEl.style.width = percent + "%";
  germanProgressTextEl.textContent = `${germanMinutes} / ${GERMAN_TARGET_MIN} min`;
}

function clearCurrentDay() {
  if (!confirm("Clear all entries for this day?")) return;
  slotState = {};
  const key = getDateKey(currentDate);
  saveDayData(key, { slots: slotState });
  applyStateToUI();
  updateSummary();
}

function resetToDefaultPlan() {
  if (
    !confirm(
      "Reset this day to the default TELC plan? This will overwrite current entries."
    )
  )
    return;
  slotState = buildDefaultDayStateForDate(currentDate);
  const key = getDateKey(currentDate);
  saveDayData(key, { slots: slotState });
  applyStateToUI();
  updateSummary();
}

function generateTextReport() {
  const dateKey = getDateKey(currentDate);
  const dateReadable = formatDateDDMMYYYY(currentDate);
  const total = timeSlots.length;
  let completed = 0;
  let germanSlotsDone = 0;
  const missed = [];
  const germanDetails = [];
  const highlights = [];

  timeSlots.forEach((t) => {
    const slot = slotState[t];
    if (!slot) return;
    const { status, task } = slot;
    const category =
      slot.category || (BASE_PLAN[t] && BASE_PLAN[t].category) || "";

    if (status === "done" || status === "german") completed++;
    if (category === "german" && (status === "done" || status === "german")) {
      germanSlotsDone++;
      germanDetails.push(`${t} – ${task || "(German study)"}`);
    }
    if (status === "missed") {
      missed.push(`${t} – ${task || "(empty)"}`);
    }
    if (status === "done" && task) {
      highlights.push(`${t} – ${task}`);
    }
  });

  const completionRatio = total > 0 ? completed / total : 0;
  const germanMinutes = germanSlotsDone * SLOT_MINUTES;
  const focusScore = Math.round(completionRatio * 10);
  const executionRatio = Math.min(1, germanMinutes / GERMAN_TARGET_MIN);
  const executionScore = Math.round(executionRatio * 10);

  const lines = [];
  lines.push(`Date: ${dateReadable} (stored key: ${dateKey})`);
  lines.push(`Days remaining to TELC B1: ${daysRemainingEl.textContent}`);
  lines.push(`German focus today: ${getFocusForDate(currentDate)}`);
  lines.push("");
  lines.push(`Total slots: ${total}`);
  lines.push(`Completed slots: ${completed}`);
  lines.push(`Focus (Mind) score (0–10): ${focusScore}`);
  lines.push(`Execution (Action) score (0–10): ${executionScore}`);
  lines.push(`German study: ${germanMinutes} minutes`);
  lines.push("");
  lines.push("Highlights (Done):");
  lines.push(
    highlights.length ? highlights.map((l) => "- " + l).join("\n") : "- (none)"
  );
  lines.push("");
  lines.push("German Study Slots (completed):");
  lines.push(
    germanDetails.length
      ? germanDetails.map((l) => "- " + l).join("\n")
      : "- (none)"
  );
  lines.push("");
  lines.push("Missed Slots:");
  lines.push(
    missed.length ? missed.map((l) => "- " + l).join("\n") : "- (none)"
  );
  lines.push("");
  lines.push("Reflection:");
  lines.push("Focus: __/10");
  lines.push("Energy: __/10");
  lines.push("One win:");
  lines.push("One difficulty:");

  reportOutputEl.value = lines.join("\n");
}

// === EXPORT: CSV ===
function exportCsv() {
  const focus = getFocusForDate(currentDate);
  const dateReadable = formatDateDDMMYYYY(currentDate);

  const rows = [];
  rows.push([
    "Date",
    dateReadable,
    "Focus",
    focus,
    "DaysRemaining",
    daysRemainingEl.textContent
  ]);
  rows.push([]);
  rows.push(["Time", "Category", "Planned Task", "Status", "Notes"]);

  timeSlots.forEach((t) => {
    const slot = slotState[t] || {};
    const category =
      slot.category || (BASE_PLAN[t] && BASE_PLAN[t].category) || "";
    const status = slot.status || "";
    const task = slot.task || "";
    rows.push([t, category, task, status, ""]);
  });

  const csvContent = rows
    .map((r) =>
      r
        .map((v) => {
          const val = v == null ? "" : String(v);
          if (val.includes(",") || val.includes('"') || val.includes("\n")) {
            return `"${val.replace(/"/g, '""')}"`;
          }
          return val;
        })
        .join(",")
    )
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `telc_planner_${getDateKey(currentDate)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// === EXPORT: XLSX ===
function exportXlsx() {
  if (typeof XLSX === "undefined") {
    alert("Excel export library not loaded.");
    return;
  }
  const focus = getFocusForDate(currentDate);
  const dateReadable = formatDateDDMMYYYY(currentDate);

  const aoa = [];
  aoa.push([
    "Date",
    dateReadable,
    "Focus",
    focus,
    "DaysRemaining",
    daysRemainingEl.textContent
  ]);
  aoa.push([]);
  aoa.push(["Time", "Category", "Planned Task", "Status", "Notes"]);

  timeSlots.forEach((t) => {
    const slot = slotState[t] || {};
    const category =
      slot.category || (BASE_PLAN[t] && BASE_PLAN[t].category) || "";
    const status = slot.status || "";
    const task = slot.task || "";
    aoa.push([t, category, task, status, ""]);
  });

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(aoa);
  XLSX.utils.book_append_sheet(wb, ws, "Day");
  XLSX.writeFile(wb, `telc_planner_${getDateKey(currentDate)}.xlsx`);
}

// === EXPORT: PDF (Coaching + Table) ===
async function exportPdf() {
  if (typeof window.jspdf === "undefined") {
    alert("PDF export library not loaded.");
    return;
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const dateReadable = formatDateDDMMYYYY(currentDate);
  const focus = getFocusForDate(currentDate);
  const total = timeSlots.length;
  let completed = 0;
  let germanSlotsDone = 0;
  let missedCount = 0;

  timeSlots.forEach((t) => {
    const slot = slotState[t];
    if (!slot) return;
    const status = slot.status || "";
    const category =
      slot.category || (BASE_PLAN[t] && BASE_PLAN[t].category) || "";

    if (status === "done" || status === "german") completed++;
    if (category === "german" && (status === "done" || status === "german")) {
      germanSlotsDone++;
    }
    if (status === "missed") missedCount++;
  });

  const completionRatio = total > 0 ? completed / total : 0;
  const germanMinutes = germanSlotsDone * SLOT_MINUTES;
  const focusScore = Math.round(completionRatio * 10);
  const executionRatio = Math.min(1, germanMinutes / GERMAN_TARGET_MIN);
  const executionScore = Math.round(executionRatio * 10);

  // === PAGE 1: Coaching summary ===
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Daily TELC B1 Coaching Report", 14, 18);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(`Date: ${dateReadable}`, 14, 28);
  doc.text(`Stored key: ${getDateKey(currentDate)}`, 14, 34);
  doc.text(
    `Days remaining to TELC B1: ${daysRemainingEl.textContent}`,
    14,
    40
  );
  doc.text(`German focus today: ${focus}`, 14, 46);

  doc.setFont("helvetica", "bold");
  doc.text("Performance Summary", 14, 58);
  doc.setFont("helvetica", "normal");
  doc.text(
    `Total slots: ${total}   Completed: ${completed}   Missed: ${missedCount}`,
    14,
    66
  );
  doc.text(
    `Focus (Mind) score: ${focusScore}/10   Execution (Action) score: ${executionScore}/10`,
    14,
    74
  );
  doc.text(
    `German study: ${germanMinutes} min  (Target: ${GERMAN_TARGET_MIN} min)`,
    14,
    82
  );

  const trend =
    germanMinutes >= GERMAN_TARGET_MIN
      ? "Strong execution today – you met or exceeded your German target."
      : germanMinutes >= GERMAN_TARGET_MIN * 0.6
      ? "Decent execution – you are on track, but push a bit more tomorrow."
      : "Low execution – tomorrow we simplify the plan and protect German blocks.";

  doc.setFont("helvetica", "bold");
  doc.text("Coach Feedback", 14, 96);
  doc.setFont("helvetica", "normal");
  doc.text(doc.splitTextToSize(trend, 180), 14, 104);

  doc.setFont("helvetica", "bold");
  doc.text("Next Action Recommendation", 14, 124);
  doc.setFont("helvetica", "normal");
  const nextActionLines = doc.splitTextToSize(
    "1) Keep morning German blocks non-negotiable.\n2) Protect at least two evening review blocks.\n3) If you miss a block, do not feel guilty – restart in the next slot.",
    180
  );
  doc.text(nextActionLines, 14, 132);

  doc.setFont("helvetica", "bold");
  doc.text("Your Reflection (fill by hand)", 14, 162);
  doc.setFont("helvetica", "normal");
  doc.text("- Focus today (0–10): ___________", 14, 170);
  doc.text("- Energy today (0–10): __________", 14, 178);
  doc.text("- One win: ______________________", 14, 186);
  doc.text("- One difficulty: ________________", 14, 194);

  // === PAGE 2: Detailed table ===
  doc.addPage("a4", "portrait");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Time Slot Details", 14, 18);

  const tableBody = timeSlots.map((t) => {
    const slot = slotState[t] || {};
    const category =
      slot.category || (BASE_PLAN[t] && BASE_PLAN[t].category) || "";
    const status = slot.status || "";
    const task = slot.task || "";
    return [t, category, task, status];
  });

  doc.autoTable({
    startY: 24,
    head: [["Time", "Category", "Planned Task", "Status"]],
    body: tableBody,
    styles: {
      fontSize: 8
    },
    headStyles: {
      fillColor: [15, 23, 42]
    }
  });

  doc.save(`telc_planner_${getDateKey(currentDate)}.pdf`);
}

// === EVENT BINDINGS ===
todayBtn.addEventListener("click", () => {
  currentDate = new Date();
  renderDatePicker();
  updateFocusLabelUI();
  loadCurrentDayFromStorage();
});

datePickerEl.addEventListener("change", () => {
  const val = datePickerEl.value;
  if (!val) return;
  currentDate = new Date(val + "T00:00:00");
  updateFocusLabelUI();
  loadCurrentDayFromStorage();
});

clearDayBtn.addEventListener("click", clearCurrentDay);
resetPlanBtn.addEventListener("click", resetToDefaultPlan);
generateReportBtn.addEventListener("click", generateTextReport);
exportCsvBtn.addEventListener("click", exportCsv);
exportXlsxBtn.addEventListener("click", exportXlsx);
exportPdfBtn.addEventListener("click", exportPdf);

// === INITIALIZE APP ===
(function init() {
  updateDaysRemaining();
  updateFocusLabelUI();
  renderDatePicker();
  createTimelineRows();
  loadCurrentDayFromStorage();
})();
