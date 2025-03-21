import "./styles.css";
import sunIcon from "./images/icon-sun.svg";
import moonIcon from "./images/icon-moon.svg";
import crossIcon from "./images/icon-cross.svg"

const toogleDarkMode = document.getElementById("toggleTheme");
const body = document.body;
const icon = document.getElementById("darkModeIcon");

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

document
  .querySelector(".todo-input")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const input = document.getElementById("newTodo");
    const todoText = input.value;

    if (todoText == "") return;

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

    document.getElementById("todoList").appendChild(li);

    input.value = "";

    li.querySelector(".delete-btn").addEventListener("click", function (){
      li.remove();
    });
  });
