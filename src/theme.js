import sunIcon from "./images/icon-sun.svg";
import moonIcon from "./images/icon-moon.svg";

const body = document.body;
const icon = document.getElementById("darkModeIcon");
localStorage.setItem("dark-mode", "enabled")

// Check if dark mode was previously enabled
if (localStorage.getItem("dark-mode") == "enabled") {
  body.classList.add("dark-mode");
  icon.src = sunIcon;
}

export function toggleTheme(){
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("dark-mode", "enabled");
    icon.src = sunIcon;
  } else {
    localStorage.setItem("dark-mode", "disabled");
    icon.src = moonIcon;
  }
}

