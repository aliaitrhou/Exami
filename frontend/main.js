import { initRouter } from "./utils/router.js";
import {
  getGithubProfiles,
  checkAuthStatus,
  logout,
} from "./utils/client-actions.js";

// render alerts ui inside navbar.
export function renderAlert(message, type) {
  const alertsElement = document.getElementById("alerts");

  const alertClass =
    type === "error"
      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      : type === "success"
        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
        : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";

  alertsElement.className = `inline-block px-4 py-1 rounded ${alertClass}`;
  alertsElement.textContent = message;

  setTimeout(() => {
    alertsElement.className = "hidden";
    alertsElement.textContent = "";
  }, 5000);
}

// light/dark modes
function changeTheme() {
  const themeToggleButton = document.getElementById("theme-toggle");
  const rootElement = document.documentElement;
  const switchButton = document.getElementById("switch-button");

  let darkMode = true;
  rootElement.classList.add("dark");
  // switchButton.innerHTML = `<i class="fa-regular fa-sun"></i>`;

  themeToggleButton.addEventListener("click", () => {
    darkMode = !darkMode;

    if (darkMode) {
      rootElement.classList.add("dark");
      themeToggleButton.classList.add("justify-end");
      // switchButton.innerHTML = `<i class="fa-regular fa-sun"></i>`;
    } else {
      rootElement.classList.remove("dark");
      themeToggleButton.classList.remove("justify-end");
      // switchButton.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    }
  });
}

export function updateNavbarForLoggedInUser(user) {
  const navButtonsContainer = document.getElementById("nav-btns");
  navButtonsContainer.className = "flex gap-2 items-center";
  navButtonsContainer.innerHTML = `
   <span class="mr-4">${user.firstname} ${user.lastname}</span>
    <button
      id="logout-btn"
      class="px-3 py-1 rounded-md bg-emerald-500 text-white border border-emerald-600 dark:border-violet-400 dark:bg-violet-500 hover:bg-emerald-600 dark:hover:bg-violet-600 "
    >
      <i class="fa-solid fa-right-from-bracket"></i>
      <span>
        Logout
      </span>
    </button>
  `;

  document.getElementById("logout-btn").addEventListener("click", () => {
    logout();
  });
}

function startExami() {
  changeTheme();
  getGithubProfiles();
  initRouter();
  checkAuthStatus();

  // check if hash exist in url "like #about"  if not path is "/home"
  // const path = window.location.hash.substring(1) || "/home";
  // console.log("path is : ", path);
  // navigateTo("home");
}

document.addEventListener("DOMContentLoaded", startExami);
