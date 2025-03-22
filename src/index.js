import "./styles.css";
import sunIcon from "./images/icon-sun.svg";
import moonIcon from "./images/icon-moon.svg";
import crossIcon from "./images/icon-cross.svg";

const toogleDarkMode = document.getElementById("toggleTheme");
const body = document.body;
const icon = document.getElementById("darkModeIcon");
const todoList = document.getElementById("todoList");
//Load all todos from localStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];


// Get Dark Mode in LocalStorage
if (localStorage.getItem("dark-mode") == "enabled") {
  body.classList.add("dark-mode");
  icon.src = sunIcon;
}
//Dark Mode
toogleDarkMode.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("dark-mode", "enabled");
    icon.src = sunIcon;
  } else {
    localStorage.setItem("dark-mode", "disabled");
    icon.src = moonIcon;
  }
});

// Load TODOS

//Add new To Do
document
  .querySelector(".todo-input")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const input = document.getElementById("newTodo");
    const todoText = input.value;

    if (todoText == "") return;

    const newTodo = { text: todoText, completed: false };
    todos.push(newTodo);
    saveAndRender();

    input.value = "";
  });

// Save in Local Storage and render
function saveAndRender() {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

//Render Todos

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    if (todo.completed) li.classList.add("completed");
    li.innerHTML = ` 
    <div class="li-text">
      <span class="round ${todo.completed ? "checked": ""}" data-index="${index}"></span>
      <p>${todo.text}</p>
    </div>
    <button class="delete-btn data-index="${index}">
      <img src=${crossIcon}>
    </button> `;

    todoList.appendChild(li)
  });
}

// mark as completed

todoList.addEventListener("click", (e) =>{
  if(e.target.classList.contains("round")){
    const index = e.target.dataset.index;
    todos[index].completed = !todos[index].completed;
    saveAndRender();
    console.log(`completed: ${e.target.dataset.index}`);
  }
})

// delete todo

todoList.addEventListener("click", (e) =>{
  if(e.target.closest(".delete-btn")){
    const index = e.target.closest(".delete-btn").dataset.index;
    todos.splice(index,1);
    saveAndRender();
  }
})

renderTodos();