const API_URL = "http://localhost:3000/api/Route";

async function loadTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.description + (task.completed ? " ✅" : "");
    if (!task.completed) {
      const doneBtn = document.createElement("button");
      doneBtn.textContent = "Done";
      doneBtn.onclick = () => markComplete(task._id);
      li.appendChild(doneBtn);
    }
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => deleteTask(task._id);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById("taskInput");
  const desc = input.value.trim();
  if (!desc) return;
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description: desc }),
  });
  input.value = "";
  loadTasks();
}

async function markComplete(id) {
  await fetch(`${API_URL}/${id}`, { method: "PUT" });
  loadTasks();
}

async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadTasks();
}

loadTasks();
