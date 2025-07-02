const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// ✅ Toast function
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "toast show";
  setTimeout(() => {
    toast.className = "toast";
  }, 4000);
}

// ✅ Add Task
function addTask() {
  if (inputBox.value.trim() === "") {
    showToast("⚠️ You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    showToast("✅ Task added successfully!");
  }
  inputBox.value = "";
  saveData();
}

// ✅ Task Actions: Check / Delete
listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
      showToast(
        e.target.classList.contains("checked")
          ? "✔️ Task completed"
          : "🔁 Task marked as pending"
      );
    } else if (e.target.tagName === "SPAN") {
      const parentLi = e.target.parentElement;
      if (parentLi.classList.contains("checked")) {
        parentLi.remove();
        showToast("🗑️ Task deleted!");
        saveData();
      } else {
        showToast("❗Mark the task as completed before deleting.");
      }
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
