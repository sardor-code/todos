const formCreate = document.getElementById("form-create");
const formEdit = document.getElementById("form-edit");
const listGroupTodo = document.getElementById("list-group-todo");
const messageCreate = document.getElementById("message-create");
const time = document.getElementById("time");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
/* time elements */
const fullDay = document.getElementById("full-day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");
const closeEl = document.getElementById("close");
//===== start project =====|
let editItemID;
let todos = JSON.parse(localStorage.getItem("list")) ? JSON.parse(localStorage.getItem("list")) : [];

if (todos.length) showTodos();

function setTodos() {
  localStorage.setItem("list", JSON.stringify(todos));
}
// time
function getTime() {
  const data = new Date();
  const date = data.getDate() < 10 ? "0" + data.getDate() : data.getDate();
  const month = data.getMonth() < 10 ? "0" + (data.getMonth() + 1) : data.getMonth();
  const time = data.getFullYear();
  const hour = data.getHours() < 10 ? "0" + data.getHours() : data.getHours();
  const minute = data.getMinutes() < 10 ? "0" + data.getMinutes() : data.getMinutes();
  const second = data.getSeconds() < 10 ? "0" + data.getSeconds() : data.getSeconds();
  const year = data.getFullYear();
  const months = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  fullDay.textContent = `${date} ${months[month]}, ${year}`;
  hourEl.textContent = hour;
  minuteEl.textContent = minute;
  secondEl.textContent = second;
  return `${hour}:${minute}, ${date}.${month + 1}.${time}`;
}
setInterval(getTime, 1000);

function showTodos() {
  listGroupTodo.innerHTML = null;
  const todos = JSON.parse(localStorage.getItem("list"));
  todos.forEach((item, idx) => {
    listGroupTodo.innerHTML += `
    <li ondblclick="setCompleted(${idx})" class="list-group-item d-flex justify-content-between  ${
      item.completed == true ? "completed" : ""
    }">
   ${item.text}
    <div class="todo-icons">
      <span class="opacity-50 me-02 ">${item.time}</span>
      <img onclick=(editTodo(${idx})) src="img/edit.svg" alt="edit icon" width="25" height="25" />
      <img onclick=(deleteTodo(${idx})) src="img/delete.svg" alt="delete icon" width="25" height="25"/>
    </div>
  </li>
    
    `;
  });
}

// show Error message
function showMessage(where, message) {
  document.getElementById(`${where}`).innerHTML = message;
  setTimeout(() => {
    document.getElementById(`${where}`).innerHTML = null;
  }, 2500);
}

/* add Event Form */
formCreate.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = formCreate["input-create"].value.trim();
  if (todoText.length) {
    todos.unshift({
      text: todoText,
      time: getTime(),
      completed: false,
    });
    setTodos();
    showTodos();
  } else {
    showMessage("message-create", "Please enter some Text... !");
  }
});

// delete todo
function deleteTodo(idx) {
  const deletedTodos = todos.filter((item, i) => {
    return i !== idx;
  });
  todos = deletedTodos;
  setTodos();
  showTodos();
}

function setCompleted(idx) {
  const completedTodos = todos.map((item, id) => {
    if (idx == id) {
      return {
        ...item,
        completed: item.completed == true ? false : true,
      };
    } else {
      return { ...item };
    }
  });
  todos = completedTodos;
  setTodos();
  showTodos();
}

formEdit.addEventListener("submit", (e) => {
  e.preventDefault();

  const todoText = formEdit["input-edit"].value.trim();

  if (todoText.length) {
    todos.splice(editItemID, 1, {
      text: todoText,
      time: getTime(),
      completed: false,
    });

    setTodos();
    showTodos();
    closeModal();
  } else {
    showMessage("message-edit", "Please enter some Text... !");
  }
});

overlay.addEventListener("click", closeModal);
closeEl.addEventListener("click", closeModal);
// edit todo
function editTodo(idx) {
  editItemID = idx;
  openModal();
}

function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}
