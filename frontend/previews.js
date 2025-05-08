import { renderAlert, updateNavbarForLoggedInUser } from "./main.js";
import { login, signup, logout } from "./utils/client-actions.js";
import { navigateTo } from "./utils/router.js";

const previewContainer = document.getElementById("dynamic-preview");

export const showStartPage = () => {
  previewContainer.innerHTML = `
  <div class="w-full h-full flex items-center justify-center">
    <div id="start-container" class="space-y-2 text-center">
      <h3 class="text-xl">Wellcome to Exami</h3>
      <p class="text-xl font-sora">Your place to create/pass exams</p>
      <button
        id="start-button"
        class="inline rounded-lg border border-emerald-600  bg-emerald-500 dark:border-violet-400 dark:bg-violet-500 text-white px-3 py-1 focus:outline-none"
      >
        Get Started
      </button>
    </div>
  </div>`;

  const startButtonElement = document.getElementById("start-button");
  return startButtonElement;
};

export const showSignupForm = () => {
  previewContainer.innerHTML = `
    <div class="w-full sm:w-[450px] md:w-[550px] xl:w-[550px] mx-auto h-full flex items-center justify-center">
      <form id="signup-form" 
        class="w-full text-black dark:text-zinc-300 flex flex-col px-6 py-4 rounded-sm border border-gray-300/50 dark:border-zinc-700/50 bg-white dark:bg-zinc-800 focus:border-none flex justify-center flex-col gap-3 py-6"
      >
      <h3 class="w-full text-center text-4xl">Sign up</h3>
        <div class="flex flex-col sm:flex-row gap-3 lg:gap-4">
          <div class="w-1/2 space-y-1">
            <label for="firstname" class="inline">First Name</label>
            <input class="w-full px-3 py-2 text-zinc-600 dark:text-zinc-300 border border-gray-300 bg-gray-200 dark:border-zinc-600 dark:bg-zinc-800 rounded-md" type="text" id="firstname" name="firstname" required>
          </div>
          <div class="w-1/2 space-y-1">
            <label for="lastname">Last Name</label>
            <input
              class="w-full px-3 py-2 text-zinc-600 dark:text-zinc-300 border border-slate-300 bg-gray-200 dark:border-zinc-600 dark:bg-zinc-800 rounded-md"
              type="text" id="lastname" name="lastname" required>
          </div>
        </div>
        <label for="email">Email</label>
        <input
          class="px-3 py-2 text-zinc-600 dark:text-zinc-300 border border-gray-300 bg-gray-200 dark:border-zinc-600 dark:bg-zinc-800 rounded-md"
          type="email" id="email" name="email" placeholder="eg. example@gmail.com" required>
        <label for="password">Password</label>
        <input
          class="px-3 py-2 text-zinc-600 dark:text-zinc-300 border border-gray-300 bg-gray-200 dark:border-zinc-600 dark:bg-zinc-800 rounded-md"
          type="password" id="password" name="password" required>
        <label for="birth">Date of birth</label>
        <input
          class="px-3 py-2 text-zinc-500 dark:text-zinc-500 border border-gray-300 bg-gray-200 dark:border-zinc-600 dark:bg-zinc-800 rounded-md"
          type="date" id="birth" name="birth" required>
        <label for="gender">Gender</label>
        <select
          required
          id="gender"
          name="gender"
          class="px-3 py-2 text-zinc-600 dark:text-zinc-300 border border-gray-300 bg-gray-200 dark:border-zinc-600 dark:bg-zinc-800 rounded-md">
          <option value="" selected>Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <div class="mb-3 flex flex-col sm:flex-row gap-3 lg:gap-4">
          <div class="w-1/2 space-y-1">
            <label  for="etablissement">Établissement</label>
            <select
              required
              id="etablissement"
              name="etablissement"
              class="block w-full px-3 py-2 text-zinc-600 dark:text-zinc-300 border border-gray-300 bg-gray-200 dark:border-zinc-600 dark:bg-zinc-800 rounded-md"
              <option value="">Your Etablissement</option>
              <option value="fs">FS</option>
              <option value="ensa">ENSA</option>
              <option value="ens">ENS</option>
              <option value="fst">FST</option>
              <option value="est">EST</option>
              <option value="ensg">ENSG</option>
            </select>
            </div>
            <div class="w-1/2 space-y-1">
              <label id="type" for="type" >User Type</label>
              <select
                  required
                  class="block w-full px-3 py-2 text-zinc-600 dark:text-zinc-300 border border-slate-300 bg-slate-200 dark:border-zinc-600 dark:bg-zinc-800 rounded-md"
                  id="type" name="type" required>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
        </div>
        <button
          id="signup-button"
          type="submit"
          class="rounded-full border border-emerald-600  bg-emerald-500 dark:border-violet-400 dark:bg-violet-500 text-white py-2 focus:outline-none"
        >
          Sign Up
        </button>
      </form>
  </div>
`;

  const formButtonElement = document.getElementById("signup-button");

  const signupForm = document.getElementById("signup-form");

  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(signupForm);
    const data = Object.fromEntries(formData.entries());

    console.log("for data is : ", data);

    formButtonElement.innerHTML = `
        <div class="w-full text-center flex flex-row items-center gap-2">
        <i class="fa-solid fa-circle-notch animate-spin"></i>
          <span>Signing up...</span>
        </div>
      `;
    formButtonElement.disabled = true;

    const status = await signup(data);

    formButtonElement.disabled = false;
    formButtonElement.innerText = `Sign Up`;
    console.log("(signup) status is: ", status);

    navigateTo("login");
  });
};

export const showLoginForm = () => {
  previewContainer.innerHTML = `
    <div class="w-full sm:w-[450px] md:w-[550px] xl:w-[550px] mx-auto h-full flex items-center justify-center">
      <form id="login-form" class="w-full p-4 sm:p-6 lg:p-8 inline space-y-3 md:space-y-4 text-black dark:text-zinc-300 rounded-sm border border-gray-300/50 dark:border-zinc-700/50 bg-white dark:bg-zinc-800">
      <h3 class="w-full text-center text-4xl">Log in</h3>
        <div class="space-y-2">
          <label for="email" class="inline">Email</label>
          <input class="w-full px-3 py-2 text-zinc-600 dark:text-zinc-300 border border-gray-300 bg-gray-200 dark:border-zinc-600 dark:bg-zinc-800 rounded-md" type="text" id="email" name="email" required>
        </div>
        <div class="space-y-2">
          <label for="password" class="">Password</label>
          <input class="w-full px-3 py-2 text-zinc-600 dark:text-zinc-300 border border-gray-300 bg-gray-200 dark:border-zinc-600 dark:bg-zinc-800 rounded-md" type="password" id="password" name="password" required>
        </div>
        <div class="space-y-2">
          <label for="type" class="">User Type</label>
          <select class="w-full px-3 py-2 text-zinc-600 dark:text-zinc-300 border border-gray-300 bg-gray-200 dark:border-zinc-600 dark:bg-zinc-800 rounded-md" id="type" name="type" required>
            <option value="" selected>choose your role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            </select>
        </div>
        <button
          id="login-button"
          type="submit"
          class="flex justify-center items-center gap-2 w-full rounded-full border border-emerald-600  bg-emerald-500 dark:border-violet-400 dark:bg-violet-500 text-white py-2 focus:outline-none mt-2 md:mt-4 xl:mt-6"
        >
          Log in
        </button>
      </form>
  </div>
`;

  const loginForm = document.getElementById("login-form");
  const formButtonElement = document.getElementById("login-button");
  const navButtonsContainer = document.getElementById("nav-btns");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());

    formButtonElement.innerHTML = `
          <i class="fa-solid fa-circle-notch animate-spin"></i>
          <span>Login in...</span>
      `;

    formButtonElement.disabled = true;

    const status = await login(data);

    formButtonElement.disabled = false;
    formButtonElement.innerText = `Log In`;

    console.log("(login) status is :", status);
    renderAlert(status.alertMessage, status.alertType);
    if (status.loggedIn) {
      updateNavbarForLoggedInUser(status.userInfo);
      switch (status.userInfo.type) {
        case "student":
          navigateTo("student-dashboard");
          break;
        case "teacher":
          navigateTo("teacher-dashboard");
          break;
        default:
          navigateTo("login");
      }
    }
  });
};

export const teacherDashboard = () => {
  previewContainer.innerHTML = `
    <div class="w-full h-full border text-center">
      <p>Teacher dashboard</p>
    </div>
  `;
};

export const studentDashboard = () => {
  previewContainer.innerHTML = `
    <div class="w-full h-full border text-center">
      <p>student dashboard</p>
    </div>
  `;
};

// Main function to render different previews
export async function renderPreview(previewName) {
  // Clear previous content
  previewContainer.innerHTML = "";

  // Show loading state
  previewContainer.innerHTML =
    '<div class="flex items-center justify-center h-full"><div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 dark:border-violet-500"></div></div>';

  try {
    switch (previewName) {
      case "home":
        renderHomePage();
        break;
      case "login":
        showLoginForm();
        break;
      case "signup":
        showSignupForm();
        break;
      case "teacher-dashboard":
        teacherDashboard();
        break;
      case "create-exam":
        // todo
        renderExamCreator();
        break;
      case "edit-exam": {
        // todo
        renderQuestionManager(examId);
        break;
      }
      case "student-dashboard":
        // todo
        studentDashboard();
        break;
      case "take-exam": {
        // todo
        renderExamTaker(examId);
        break;
      }
      case "exam-results": {
        // todo
        const examId = getParamFromUrl("examId");
        await renderExamResults(examId);
        break;
      }
      case "not-found":
        renderNotFoundPage();
        break;
      default:
        renderHomePage();
    }
  } catch (error) {
    console.error("Error rendering preview:", error);
    previewContainer.innerHTML = `
      <div class="flex flex-col items-center justify-center h-full">
        <div class="text-red-500 text-xl mb-4">An error occurred</div>
        <div class="text-gray-500 dark:text-gray-400">${error.message}</div>
      </div>
    `;
  }
}

// Home page
function renderHomePage() {
  previewContainer.innerHTML = `
    <div class="flex flex-col items-center justify-center h-full">
      <h1 class="text-4xl font-bold mb-4 font-sora">Welcome to Exami</h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">Your platform to create/pass exams.</p>
      <div class="flex space-x-4">
        <a href="#login" class="px-6 py-2  bg-gray-200 dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors">Get started</a>
      </div>
    </div>
  `;
}

// Not found page
function renderNotFoundPage() {
  previewContainer.innerHTML = `
    <div class="flex flex-col items-center justify-center h-full font-sora">
      <h1 class="text-4xl font-bold mb-3">404</h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">Oops! - Page not found</p>
      <a href="#home" class="px-4 py-2 bg-emerald-500 dark:bg-violet-500 text-white rounded-lg hover:bg-emerald-600 dark:hover:bg-violet-600 transition-colors">Go Home</a>
    </div>
  `;
}
