let subjects = JSON.parse(localStorage.getItem("subjects")) || [];

function saveToLocalStorage() {
  localStorage.setItem("subjects", JSON.stringify(subjects));
}

function addSubject() {
  const name = document.getElementById("subjectName").value.trim();
  if (!name) return;
  subjects.push({ name, topics: [] });
  document.getElementById("subjectName").value = "";
  saveToLocalStorage();
  renderSubjects();
}

function deleteSubject(index) {
  if (confirm("Delete this subject?")) {
    subjects.splice(index, 1);
    saveToLocalStorage();
    renderSubjects();
  }
}

function clearTopics(index) {
  if (confirm("Clear all topics?")) {
    subjects[index].topics = [];
    saveToLocalStorage();
    renderSubjects();
  }
}

function addTopic(subjectIndex, topicText, dueDate) {
  if (!topicText.trim()) return;
  subjects[subjectIndex].topics.push({
    text: topicText,
    due: dueDate,
    done: false,
  });
  saveToLocalStorage();
  renderSubjects();
}

function toggleTopic(subjectIndex, topicIndex) {
  subjects[subjectIndex].topics[topicIndex].done ^= true;
  saveToLocalStorage();
  renderSubjects();
}

function renderSubjects() {
  const container = document.getElementById("subjectsContainer");
  const filter = document.getElementById("searchInput").value.toLowerCase();
  container.innerHTML = "";

  subjects.forEach((subject, subjectIndex) => {
    if (!subject.name.toLowerCase().includes(filter)) return;

    const div = document.createElement("div");
    div.className = "subject";

    const header = document.createElement("h3");
    header.innerHTML = `${subject.name}
      <span class="subject-actions">
        <button onclick="clearTopics(${subjectIndex})">🧹</button>
        <button onclick="deleteSubject(${subjectIndex})">🗑️</button>
      </span>`;

    const topicInput = document.createElement("div");
    topicInput.className = "topic-input";

    const inputText = document.createElement("input");
    inputText.placeholder = "Add topic...";

    const inputDate = document.createElement("input");
    inputDate.type = "date";

    const addBtn = document.createElement("button");
    addBtn.textContent = "Add";
    addBtn.onclick = () =>
      addTopic(subjectIndex, inputText.value, inputDate.value);

    topicInput.append(inputText, inputDate, addBtn);

    const ul = document.createElement("ul");
    subject.topics.forEach((t, topicIndex) => {
      const li = document.createElement("li");
      li.className = t.done ? "completed" : "";

      const text = `${t.text} ${t.due ? `(Due: ${t.due})` : ""}`;
      li.innerHTML = `
        ${text}
        <button onclick="toggleTopic(${subjectIndex}, ${topicIndex})">
          ${t.done ? "Undo" : "Done"}
        </button>
      `;
      ul.appendChild(li);
    });

    const completed = subject.topics.filter((t) => t.done).length;
    const total = subject.topics.length;
    const percent = total ? (completed / total) * 100 : 0;

    const progress = document.createElement("div");
    progress.innerHTML = `Progress: ${completed}/${total} (${Math.round(
      percent
    )}%)`;

    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar";
    progressBar.innerHTML = `<div class="progress-bar-fill" style="width: ${percent}%"></div>`;

    div.append(header, topicInput, ul, progress, progressBar);
    container.appendChild(div);
  });
}

document.getElementById("searchInput").addEventListener("input", renderSubjects);

document.getElementById("toggleTheme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const themeBtn = document.getElementById("toggleTheme");
  themeBtn.textContent = document.body.classList.contains("dark")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});

window.onload = renderSubjects;
