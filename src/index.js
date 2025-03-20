import "./styles.css";
import sunIcon from "./images/icon-sun.svg"
import moonIcon from "./images/icon-moon.svg"
import lightMobileBg from "./images/bg-mobile-light.jpg"
import lightDesktopeBg from "./images/bg-desktop-light.jpg"
import darkMobileBg from "./images/bg-mobile-dark.jpg"
import darkDesktopBg from "./images/bg-desktop-dark.jpg"





const toogleDarkMode = document.getElementById("toggleTheme");
const body = document.body;
const icon = document.getElementById("darkModeIcon")
const background = document.getElementsByClassName("background");

toogleDarkMode.addEventListener("click", () =>{
  body.classList.toggle("dark-mode")

  if(body.classList.contains("dark-mode")){
    icon.src= sunIcon;

  }
  else{
    icon.src= moonIcon;

  }



})