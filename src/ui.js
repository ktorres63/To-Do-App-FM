import Sortable from "sortablejs";
import crossIcon from "./images/icon-cross.svg";

import {
  todos,
  addTodo,
  removeTodo,
  toggleComplete,
  clearCompletedTodos,
  saveTodos,
  setTodos,
} from "./todos";

const filterButtons = {
  all: document.querySelectorAll(".btn-All"),
  active: document.querySelectorAll(".btn-active"),
  completed: document.querySelectorAll(".btn-completed"),
};
let currentFilter = "all";

function setFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll(".buttons-footer a, .buttons a").forEach((btn) => {
    btn.classList.remove("active");
  });
  filterButtons[filter].forEach((btn) => btn.classList.add("active"));
  renderTodos();
}
Object.keys(filterButtons).forEach((filter) => {
  filterButtons[filter].forEach((btn) => {
    btn.addEventListener("click", () => setFilter(filter));
  });
});


const todoList = document.getElementById("todoList");
const clearCompleted = document.getElementById("clearCompleted");

export function renderTodos() {
  todoList.innerHTML = "";
  todos
    .filter((todo) => {
      if (currentFilter == "active") return !todo.completed;
      if (currentFilter == "completed") return todo.completed;
      return true;
    })
    .forEach((todo, index) => {
      const li = document.createElement("li");
      li.classList.add("todo-item");
      li.dataset.index = index;

      if (todo.completed) li.classList.add("completed");
      li.innerHTML = ` 
        <div class="li-text">
          <span class="round ${
            todo.completed ? "checked" : ""
          }" data-index="${index}"></span>
          <p>${todo.text}</p>
        </div>
        <button class="delete-btn" data-index="${index}">
          <img src=${crossIcon}>
        </button> `;
      todoList.appendChild(li);
    });
}

//Add a new Todo
document
  .querySelector(".todo-input")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const input = document.getElementById("newTodo");
    addTodo(input.value);
    input.value = "";
    renderTodos();
  });

// Mark as completed
todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("round")) {
    toggleComplete(e.target.dataset.index);
    renderTodos();
  }
});

// Delete Todo

todoList.addEventListener("click", (e) => {
  if (e.target.closest(".delete-btn")) {
    const index = e.target.closest(".delete-btn").dataset.index;
    removeTodo(index);
    renderTodos();
  }
});

//Clear completed
clearCompleted.addEventListener("click", () => {
  clearCompletedTodos();
  renderTodos();
});

//Drag and Drop with SortableJS
new Sortable(todoList, {
  animation: 150,
  ghostClass: "dragging",
  onEnd: function (evt) {
    const newOrder = [...todoList.children].map(
      (li) => li.querySelector("p").textContent
    );

    let nuevoTodos = [];
    for (let i = 0; i < newOrder.length; i++) {
      let textoTarea = newOrder[i];

      let tareaEncontrada = todos.find(function (tarea) {
        return tarea.text === textoTarea;
      });

      if (tareaEncontrada) {
        nuevoTodos.push(tareaEncontrada);
      }
    }
    setTodos(nuevoTodos);
    saveTodos();
  },
});
