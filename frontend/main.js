import { initRouter } from "./utils/router.js";
import {
  getGithubProfiles,
  checkAuthStatus,
  logout,
  getUser,
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

export function navigationUI() {
  const container = document.getElementById("navigation");
  const user = getUser();

  if (!user) {
    return;
  }

  container.innerHTML = `
  <div id="links-container" class="space-y-1">
    <a id="dashboard-btn" href="${user.type === "student" ? "#student-dashboard" : "#teacher-dashboard"}" class="w-full text-left px-4 py-2 rounded-md flex items-center bg-emerald-100 dark:bg-violet-900/30 text-emerald-600 dark:text-violet-300">
        <i class="fas fa-home mr-2"></i>
        <span>Dashboard</span>
    </a>
    <!-- <a href="${user.type === "teacher" ? "#create-exam" : "#teacher-exams"}" id="exams-btn" class="w-full text-left px-4 py-2 rounded-md flex items-center hover:bg-gray-100 dark:hover:bg-zinc-700"> -->
    <!--     <i class="fas fa-book mr-2"></i> -->
    <!--     <span>${user.type === "teacher" ? "Create Exams" : "Taken Exams"}</span> -->
    <!-- </a> -->
  </div>
`;

  // if (user.type === "student") {
  //   document.getElementById("links-container").innerHTML += `
  //     <a href="#exam-results" id="results-btn" class="w-full text-left px-4 py-2 rounded-md flex items-center hover:bg-gray-100 dark:hover:bg-zinc-700">
  //       <i class="fas fa-chart-bar mr-2"></i>
  //       <span>Results</span>
  //     </a>
  // `;
  // }
}

function startExami() {
  changeTheme();
  getGithubProfiles();
  initRouter();
  checkAuthStatus();
}

document.addEventListener("DOMContentLoaded", startExami);
