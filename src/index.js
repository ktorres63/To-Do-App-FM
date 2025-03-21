import "./styles.css";
import sunIcon from "./images/icon-sun.svg";
import moonIcon from "./images/icon-moon.svg";
import crossIcon from "./images/icon-cross.svg"

const toogleDarkMode = document.getElementById("toggleTheme");
const body = document.body;
const icon = document.getElementById("darkModeIcon");
const todoList = document.getElementById("todoList");
const input = document.getElementById("newTodo");


if(localStorage.getItem("dark-mode") == "enabled"){
  body.classList.add("dark-mode");
  icon.src = sunIcon;
}


toogleDarkMode.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("dark-mode", "enabled")
    icon.src = sunIcon;
  } else {
    localStorage.setItem("dark-mode", "disabled")
    icon.src = moonIcon;
  }
});
// Load TODOS
document.addEventListener("DOMContentLoaded", loadTodos)

//Add To Do

function addTodo(todoText, save = true){
  const li = document.createElement("li");
  li.classList.add("todo-item")
    li.innerHTML = ` 
    <div class="li-text">
      <span class="round"></span>
      <p>${todoText}</p>
    </div>
    <button class="delete-btn">
      <img src=${crossIcon}>
    </button> `;

    todoList.appendChild(li);
    
    // Delete To Do

    li.querySelector(".delete-btn").addEventListener("click", function (){
      li.remove();
      saveTodos();
    });

    if(save) saveTodos();
}

//Save in Local Storage

function saveTodos(){
  const todos = [];
  document.querySelectorAll(".todo-item p").forEach((todo) =>{
    todos.push(todo.textContent);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos(){
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || []
  savedTodos.forEach((todo) => addTodo(todo, false))
}





document
  .querySelector(".todo-input")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const todoText = input.value;

    if (todoText == "") return;

    addTodo(todoText)
    input.value = "";
   
  });
