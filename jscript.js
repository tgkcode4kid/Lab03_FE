function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");

  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;

  // Nút Complete
  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✅";
  completeBtn.classList.add("complete-btn");
  completeBtn.onclick = () => {
    taskSpan.classList.toggle("completed");
    showSuccess("Task marked as completed!");
  };

  // Nút Delete
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.onclick = () => {
    li.remove();
  };

  const buttonGroup = document.createElement("div");
  buttonGroup.classList.add("task-buttons");
  buttonGroup.appendChild(completeBtn);
  buttonGroup.appendChild(deleteBtn);

  li.appendChild(taskSpan);
  li.appendChild(buttonGroup);

  document.getElementById("taskList").appendChild(li);
  input.value = "";
}

function showSuccess(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);
  }, 2000);
}

const API_URL = "https://lab03-be.onrender.com/api/Route";