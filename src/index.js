import "./styles.css";
import { toggleTheme } from "./theme.js";
import { renderTodos } from "./ui.js";

renderTodos();

document.getElementById("toggleTheme").addEventListener("click", toggleTheme);
