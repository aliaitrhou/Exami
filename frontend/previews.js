import { renderAlert, updateNavbarForLoggedInUser } from "./main.js";
import {
  login,
  signup,
  logout,
  checkAuthStatus,
  getUser,
  getAllExams,
  createExam,
} from "./utils/client-actions.js";
import { navigateTo } from "./utils/router.js";

const previewContainer = document.getElementById("dynamic-preview");

const showStartPage = () => {
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

const showSignupForm = () => {
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
          class="flex justify-center items-center gap-2 w-full rounded-full border border-emerald-600  bg-emerald-500 dark:border-violet-400 dark:bg-violet-500 text-white py-2 focus:outline-none mt-2 md:mt-4 xl:mt-6"
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
        <div class="w-full flex flex-row items-center justify-center gap-2">
          <i class="fa-solid fa-circle-notch animate-spin"></i>
          <span>Signing up...</span>
        </div>
      `;
    formButtonElement.disabled = true;

    const status = await signup(data);

    formButtonElement.disabled = false;
    formButtonElement.innerText = `Sign Up`;
    console.log("(signup) status is: ", status);
    renderAlert(status.alertMessage, status.alertType);
    if (status.alertType === "success") {
      navigateTo("login");
    }
  });
};

const showLoginForm = () => {
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
      navigateTo("home");
    }
  });
};

const teacherDashboard = async () => {
  const user = getUser();

  previewContainer.innerHTML = `
    <div class="w-full h-full p-6 space-y-6">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="font-semibold text-3xl mb-1">Welcome back,</h3>
          <h4 class="text-xl text-emerald-500 dark:text-violet-400">Professor ${user.lastname}!</h4>
        </div>
        <a href="#create-exam" class="flex items-center gap-2 rounded-md bg-emerald-500 dark:bg-violet-500 text-white px-2 py-1 text-sm shadow hover:bg-emerald-600 dark:hover:bg-violet-600">
          <i class="fa-solid fa-plus"></i>
          <span>Create Exam</span>
        </a>
      </div>

      <p class="text-lg font-sora text-zinc-600 dark:text-zinc-400">Manage your exams and review student results below.</p>

      <div id="created-exams" class="w-full space-y-4">
        <h3 class="font-semibold text-lg mb-2">Exams Created</h3>
        <div id="exams-list" class="w-full h-full">
          <!-- Exams will render here -->
        </div>
      </div>
    </div>
  `;

  const examsList = document.getElementById("exams-list");
  examsList.innerHTML = `
    <div class="w-full h-full mt-16 flex items-center justify-center">
         <i class="fa-solid fa-xl fa-circle-notch animate-spin"></i>
    </div>
    `;

  const result = await getAllExams(user.id);
  examsList.innerHTML = ``;

  if (result.alertType === "error") {
    return renderAlert(result.message, result.alertType);
  }

  examsList.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4";
  result.exams.map((exam) => {
    examsList.innerHTML += `
      <div class="rounded-lg border border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 hover:dark:border-zinc-600 p-4 transition">
        <h4 class="font-semibold text-lg mb-1">${exam.title}</h4>
        <p class="text-sm text-zinc-500 mb-2 font-sora">${exam.description}</p>
        <p class="text-xs text-zinc-400 mb-4">Target: ${exam.target_audience}</p>
        <a id="edit-btn" href="#edit-exam/${exam.id}"
          class="text-xs px-1 rounded bg-emerald-500 dark:bg-violet-500 border border-emerald-600 dark:border-violet-400 text-white"
        >
          Edit Exam →
        </a>
      </div>
    `;

    // document.addEventListener("click", () => {
    //   window.location.hash = `edit-exam/${exam.id}`;
    // });
  });
};

function renderExamCreator() {
  // Get the logged in teacher's ID from local storage or session
  const user = getUser();
  const teacherId = user.id || 0;

  previewContainer.innerHTML = `
    <div class="p-6 space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold">Create New Exam</h2>
        <a href="#teacher-dashboard" class="w-fit rounded-md text-xs border border-emerald-600 bg-emerald-500 dark:border-violet-400 dark:bg-violet-500 text-white py-1 px-2 focus:outline-none">
          <i class="fa-solid fa-chevron-left font-bold"></i>
          <span>Dashboard</span>
        </a>
      </div>
      
      <div class="mx-auto">
        
        <form id="exam-form" class="space-y-4">
          <!-- Exam Details Section -->
          <div class="space-y-3 p-4 border border-zinc-200 dark:border-zinc-700">
            <h3 class="font-medium">Exam Details</h3>
            
            <div class="w-full flex items-center gap-4">
              <div class="w-1/2">
                <label class="block text-sm mb-1">Title</label>
                <input type="text" name="title" class="w-full rounded border border-zinc-300 dark:border-zinc-600 p-2 bg-zinc-100 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500" required />
              </div>

              <div class="w-1/2">
                <label class="block text-sm mb-1">Target Audience</label>
                <input type="text" name="target_audience" class="w-full rounded border border-zinc-300 dark:border-zinc-600 p-2 bg-zinc-100 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500" required />
              </div>
            </div>
            
            <div>
              <label class="block text-sm mb-1">Description</label>
              <textarea name="description" rows="2" class="resize-none w-full rounded border border-zinc-300 dark:border-zinc-600 p-2 bg-zinc-100 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500" required></textarea>
            </div>
            
            
            <!-- NOTE: (me): this teacher id is hidden, cause it should be taken from user session-->
            <input type="hidden" name="teacher_id" value="${teacherId}" />
          </div>
          
          <!-- Questions Section -->
          <div class="max-h-[45dvh] overflow-y-auto  space-y-4 p-4 border border-zinc-200 dark:border-zinc-700">
            <div class="flex justify-between items-center">
              <h3 class="font-medium">Questions</h3>
              <div id="add-question-alert" class="hidden text-xs font-sora  rounded text-blue-600 bg-blue-300 px-3">
                Scroll down to fill other forms
              </div>
              <div class="space-x-2">
                <button type="button" id="add-qcm-btn" class="text-xs rounded bg-emerald-100 dark:bg-violet-900 text-emerald-700 dark:text-violet-300 py-1 px-2 border border-emerald-200 dark:border-violet-700">
                  Add QCM Question
                </button>
                <button type="button" id="add-direct-btn" class="text-xs rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 py-1 px-2 border border-blue-200 dark:border-blue-700">
                  Add Direct Question
                </button>
              </div>
            </div>
            
            <div id="questions-container" class="space-y-6">
              <!-- Questions will be added here -->
              <div class="text-center text-sm text-zinc-500 dark:text-zinc-400 py-4">
                Add questions using the buttons above
              </div>
            </div>
          </div>
          
          <div class="flex justify-start">
            <button type="submit" class="rounded bg-emerald-500 dark:bg-violet-500 border border-emerald-600 dark:border-violet-400 text-white py-2 px-6 font-medium hover:bg-emerald-600 dark:hover:bg-violet-600">
              Create Exam
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  let questionCounter = 0;

  function addQCMQuestion() {
    const questionId = questionCounter++;
    const questionTemplate = `
      <div class="question-item qcm-question p-4 border border-emerald-200 dark:border-violet-700 rounded-lg bg-emerald-50 dark:bg-violet-900/20" data-question-id="${questionId}">
        <div class="flex justify-between mb-2">
          <h4 class="font-medium text-emerald-700 dark:text-violet-300">QCM Question</h4>
          <button type="button" class="delete-question-btn text-red-500 text-sm" data-question-id="${questionId}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
        
        <div class="space-y-3">
          <div>
            <label class="block text-sm mb-1">Question Statement</label>
            <textarea name="questions[${questionId}][statement]" rows="2" class="w-full rounded border border-zinc-300 dark:border-zinc-600 p-2 bg-zinc-100 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500" required></textarea>
          </div>
          
          <div class="flex space-x-4">
            <div class="w-1/3">
              <label class="block text-sm mb-1">Duration (seconds)</label>
              <input type="number" name="questions[${questionId}][duration]" min="5" class="w-full rounded border border-zinc-300 dark:border-zinc-600 p-2 bg-zinc-100 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500" required />
            </div>
            
            <div class="w-1/3">
              <label class="block text-sm mb-1">Score Points</label>
              <input type="number" name="questions[${questionId}][score]" min="1" class="w-full rounded border border-zinc-300 dark:border-zinc-600 p-2 bg-zinc-100 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500" required />
            </div>
            
            <div class="w-1/3">
              <label class="block text-sm mb-1">Media URL (optional)</label>
              <input type="text" name="questions[${questionId}][media_url]" class="w-full rounded border border-zinc-300 dark:border-zinc-600 p-2 bg-zinc-100 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500" />
            </div>
          </div>
          
          <input type="hidden" name="questions[${questionId}][type]" value="qcm" />
          
          <div class="options-container space-y-2">
            <h5 class="text-sm font-medium">Options</h5>
            <div class="options-list space-y-2">
              <!-- Initial options -->
              <div class="option-item flex items-center space-x-2">
                <input type="checkbox" name="questions[${questionId}][qcm_options][0][is_correct]" class="rounded border-zinc-300 text-emerald-500 dark:text-violet-500 focus:ring-0" />
                <input type="text" name="questions[${questionId}][qcm_options][0][option_text]" placeholder="Option text" class="flex-1 rounded border border-zinc-300 dark:border-zinc-600 p-1 text-sm bg-zinc-100 dark:bg-zinc-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:focus:ring-violet-500" required />
                <button type="button" class="delete-option-btn text-red-500 text-sm">
                  <i class="fa-solid fa-times"></i>
                </button>
              </div>
              <div class="option-item flex items-center space-x-2">
                <input type="checkbox" name="questions[${questionId}][qcm_options][1][is_correct]" class="rounded border-zinc-300 text-emerald-500 dark:text-violet-500 focus:ring-0" />
                <input type="text" name="questions[${questionId}][qcm_options][1][option_text]" placeholder="Option text" class="flex-1 rounded border border-zinc-300 dark:border-zinc-600 p-1 text-sm bg-zinc-100 dark:bg-zinc-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:focus:ring-violet-500" required />
                <button type="button" class="delete-option-btn text-red-500 text-sm">
                  <i class="fa-solid fa-times"></i>
                </button>
              </div>
            </div>
            
            <button type="button" class="add-option-btn text-xs rounded bg-emerald-100 dark:bg-violet-900 text-emerald-700 dark:text-violet-300 py-1 px-2 border border-emerald-200 dark:border-violet-700">
              Add Option
            </button>
          </div>
        </div>
      </div>
    `;

    // Add to questions container
    const questionsContainer = document.getElementById("questions-container");
    if (questionsContainer.querySelector(".text-center")) {
      questionsContainer.innerHTML = "";
    }
    questionsContainer.insertAdjacentHTML("beforeend", questionTemplate);

    // Set up event handlers for the new question
    setupQuestionEventHandlers(questionId);
  }

  // Function to create a direct answer question
  function addDirectQuestion() {
    const questionId = questionCounter++;
    console.log("question id is :", questionId);
    if (questionId > 0) {
      document.getElementById("add-question-alert").classList.remove("hidden");
    }
    const questionTemplate = `
      <div class="question-item direct-question p-4 border border-blue-200 dark:border-blue-700 rounded-lg bg-blue-50 dark:bg-blue-900/20" data-question-id="${questionId}">
        <div class="flex justify-between mb-2">
          <h4 class="font-medium text-blue-700 dark:text-blue-300">Direct Question</h4>
          <button type="button" class="delete-question-btn text-red-500 text-sm" data-question-id="${questionId}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
        
        <div class="space-y-3">
          <div>
            <label class="block text-sm mb-1">Question Statement</label>
            <textarea name="questions[${questionId}][statement]" rows="2" class="w-full rounded border border-zinc-300 dark:border-zinc-600 p-2 bg-zinc-100 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500" required></textarea>
          </div>
          
          <div>
            <label class="block text-sm mb-1">Correct Answer</label>
            <textarea name="questions[${questionId}][correct_answer]" rows="2" class="w-full rounded border border-zinc-300 dark:border-zinc-600 p-2 bg-zinc-100 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500" required></textarea>
          </div>
          
          <div class="flex space-x-4">
            <div class="w-1/4">
              <label class="block text-sm mb-1">Duration (seconds)</label>
              <input type="number" name="questions[${questionId}][duration]" min="5" class="w-full rounded border border-zinc-300 dark:border-zinc-600 p-2 bg-zinc-100 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500" required />
            </div>
            
            <div class="w-1/4">
              <label class="block text-sm mb-1">Score Points</label>
              <input type="number" name="questions[${questionId}][score]" min="1" class="w-full rounded border border-zinc-300 dark:border-zinc-600 p-2 bg-zinc-100 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500" required />
            </div>
            
            <div class="w-1/4">
              <label class="block text-sm mb-1">Tolerance %</label>
              <input type="number" name="questions[${questionId}][tolerance]" min="0" max="100" class="w-full rounded border border-zinc-300 dark:border-zinc-600 p-2 bg-zinc-100 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500" required />
            </div>
            
            <div class="w-1/4">
              <label class="block text-sm mb-1">Media URL (optional)</label>
              <input type="text" name="questions[${questionId}][media_url]" class="w-full rounded border border-zinc-300 dark:border-zinc-600 p-2 bg-zinc-100 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500" />
            </div>
          </div>
          
          <input type="hidden" name="questions[${questionId}][type]" value="direct" />
        </div>
      </div>
    `;

    // Add to questions container
    const questionsContainer = document.getElementById("questions-container");
    if (questionsContainer.querySelector(".text-center")) {
      questionsContainer.innerHTML = "";
    }
    questionsContainer.insertAdjacentHTML("beforeend", questionTemplate);

    // Set up event handlers for the new question
    setupQuestionEventHandlers(questionId);
  }

  // Set up event handlers for a question
  function setupQuestionEventHandlers(questionId) {
    // Delete question button
    const deleteBtn = document.querySelector(
      `.delete-question-btn[data-question-id="${questionId}"]`,
    );
    if (deleteBtn) {
      deleteBtn.addEventListener("click", function () {
        const questionElement = document.querySelector(
          `.question-item[data-question-id="${questionId}"]`,
        );
        if (questionElement) {
          questionElement.remove();

          // If no questions left, show the placeholder
          const questionsContainer = document.getElementById(
            "questions-container",
          );
          if (questionsContainer.children.length === 0) {
            questionsContainer.innerHTML = `
              <div class="text-center text-sm text-zinc-500 dark:text-zinc-400 py-4">
                Add questions using the buttons above
              </div>
            `;
          }
        }
      });
    }

    // QCM specific handlers (Add option button and Delete option buttons)
    const questionElement = document.querySelector(
      `.question-item[data-question-id="${questionId}"]`,
    );
    if (questionElement && questionElement.classList.contains("qcm-question")) {
      // Add option button
      const addOptionBtn = questionElement.querySelector(".add-option-btn");
      if (addOptionBtn) {
        addOptionBtn.addEventListener("click", function () {
          const optionsList = questionElement.querySelector(".options-list");
          const optionCount = optionsList.children.length;

          const newOption = `
            <div class="option-item flex items-center space-x-2">
              <input type="checkbox" name="questions[${questionId}][qcm_options][${optionCount}][is_correct]" class="rounded border-zinc-300 text-emerald-500 dark:text-violet-500 focus:ring-0" />
              <input type="text" name="questions[${questionId}][qcm_options][${optionCount}][option_text]" placeholder="Option text" class="flex-1 rounded border border-zinc-300 dark:border-zinc-600 p-1 text-sm bg-zinc-100 dark:bg-zinc-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:focus:ring-violet-500" required />
              <button type="button" class="delete-option-btn text-red-500 text-sm">
                <i class="fa-solid fa-times"></i>
              </button>
            </div>
          `;

          optionsList.insertAdjacentHTML("beforeend", newOption);

          // Set up delete button for the new option
          const newOptionElement = optionsList.lastElementChild;
          const deleteOptionBtn =
            newOptionElement.querySelector(".delete-option-btn");
          if (deleteOptionBtn) {
            deleteOptionBtn.addEventListener("click", function () {
              // Don't allow deleting if only 2 options left
              if (optionsList.children.length > 2) {
                newOptionElement.remove();
                renumberOptions(questionId);
              } else {
                alert("QCM questions must have at least 2 options");
              }
            });
          }
        });
      }

      // Delete option buttons for initial options
      const deleteOptionBtns =
        questionElement.querySelectorAll(".delete-option-btn");
      deleteOptionBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          const optionsList = questionElement.querySelector(".options-list");
          // Don't allow deleting if only 2 options left
          if (optionsList.children.length > 2) {
            btn.closest(".option-item").remove();
            renumberOptions(questionId);
          } else {
            renderAlert("QCM questions must have at least 2 options");
          }
        });
      });
    }
  }

  // Renumber options after deletion
  function renumberOptions(questionId) {
    const questionElement = document.querySelector(
      `.question-item[data-question-id="${questionId}"]`,
    );
    if (questionElement) {
      const optionItems = questionElement.querySelectorAll(".option-item");
      optionItems.forEach((item, index) => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const textInput = item.querySelector('input[type="text"]');

        if (checkbox) {
          checkbox.name = `questions[${questionId}][qcm_options][${index}][is_correct]`;
        }

        if (textInput) {
          textInput.name = `questions[${questionId}][qcm_options][${index}][option_text]`;
        }
      });
    }
  }

  // Add event listeners to buttons
  document
    .getElementById("add-qcm-btn")
    .addEventListener("click", addQCMQuestion);
  document
    .getElementById("add-direct-btn")
    .addEventListener("click", addDirectQuestion);

  // Form submission handler
  const form = document.getElementById("exam-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validate the form
    if (!validateExamForm()) {
      return;
    }

    // Process form data to match the expected format
    const examData = processExamFormData();

    const result = await createExam(examData);
    renderAlert(result.message, result.alertType);
    if (result.alertType === "success") {
      window.location.hash = "teacher-dashboard";
    }
  });

  // Form validation function
  function validateExamForm() {
    // Basic validation
    const title = form.querySelector('input[name="title"]').value.trim();
    const description = form
      .querySelector('textarea[name="description"]')
      .value.trim();
    const targetAudience = form
      .querySelector('input[name="target_audience"]')
      .value.trim();
    const questions = document.querySelectorAll(".question-item");

    if (!title) {
      renderAlert("Please enter an exam title");
      return false;
    }

    if (!description) {
      rednerAlert("Please enter an exam description");
      return false;
    }

    if (!targetAudience) {
      renderAlert("Please enter a target audience");
      return false;
    }

    if (questions.length === 0) {
      renderAlert("Please add at least one question");
      return false;
    }

    // Validate each question
    for (const questionElement of questions) {
      const questionId = questionElement.dataset.questionId;
      const statement = questionElement
        .querySelector(`textarea[name="questions[${questionId}][statement]"]`)
        .value.trim();
      const duration = parseInt(
        questionElement.querySelector(
          `input[name="questions[${questionId}][duration]"]`,
        ).value,
      );
      const score = parseInt(
        questionElement.querySelector(
          `input[name="questions[${questionId}][score]"]`,
        ).value,
      );

      if (!statement) {
        renderAlert("Please enter a statement for all questions");
        return false;
      }

      if (isNaN(duration) || duration < 5) {
        renderAlert(
          "Please enter a valid duration (at least 5 seconds) for all questions",
        );
        return false;
      }

      if (isNaN(score) || score < 1) {
        renderAlert(
          "Please enter a valid score (at least 1 point) for all questions",
        );
        return false;
      }

      // QCM specific validation
      if (questionElement.classList.contains("qcm-question")) {
        const options = questionElement.querySelectorAll(".option-item");
        let hasCorrectOption = false;

        for (const option of options) {
          const optionText = option
            .querySelector('input[type="text"]')
            .value.trim();
          const isCorrect = option.querySelector(
            'input[type="checkbox"]',
          ).checked;

          if (!optionText) {
            renderAlert("Please enter text for all options");
            return false;
          }

          if (isCorrect) {
            hasCorrectOption = true;
          }
        }

        if (!hasCorrectOption) {
          renderAlert(
            "Please select at least one correct option for each QCM question",
          );
          return false;
        }
      }

      // Direct question specific validation
      if (questionElement.classList.contains("direct-question")) {
        const correctAnswer = questionElement
          .querySelector(
            `textarea[name="questions[${questionId}][correct_answer]"]`,
          )
          .value.trim();
        const tolerance = parseInt(
          questionElement.querySelector(
            `input[name="questions[${questionId}][tolerance]"]`,
          ).value,
        );

        if (!correctAnswer) {
          renderAlert("Please enter a correct answer for all direct questions");
          return false;
        }

        if (isNaN(tolerance) || tolerance < 0 || tolerance > 100) {
          renderAlert(
            "Please enter a valid tolerance percentage (0-100) for all direct questions",
          );
          return false;
        }
      }
    }

    return true;
  }

  // Process form data to match the expected format
  function processExamFormData() {
    const formData = new FormData(form);

    // Basic exam info
    const examData = {
      title: formData.get("title"),
      description: formData.get("description"),
      target_audience: formData.get("target_audience"),
      teacher_id: parseInt(formData.get("teacher_id")),
      questions: [],
    };

    // Process questions
    const questionElements = document.querySelectorAll(".question-item");

    questionElements.forEach((questionElement) => {
      const questionId = questionElement.dataset.questionId;
      const questionType = formData.get(`questions[${questionId}][type]`);

      const questionData = {
        type: questionType,
        statement: formData.get(`questions[${questionId}][statement]`),
        media_url: formData.get(`questions[${questionId}][media_url]`) || null,
        duration: parseInt(formData.get(`questions[${questionId}][duration]`)),
        score: parseInt(formData.get(`questions[${questionId}][score]`)),
      };

      // Add type-specific fields
      if (questionType === "qcm") {
        // Find all options for this question
        const qcmOptions = [];
        const optionElements = questionElement.querySelectorAll(".option-item");

        optionElements.forEach((optionElement, index) => {
          qcmOptions.push({
            option_text: formData.get(
              `questions[${questionId}][qcm_options][${index}][option_text]`,
            ),
            is_correct:
              formData.get(
                `questions[${questionId}][qcm_options][${index}][is_correct]`,
              ) === "on",
          });
        });

        questionData.qcm_options = qcmOptions;
      } else if (questionType === "direct") {
        questionData.correct_answer = formData.get(
          `questions[${questionId}][correct_answer]`,
        );
        questionData.tolerance = parseInt(
          formData.get(`questions[${questionId}][tolerance]`),
        );
      }

      examData.questions.push(questionData);
    });

    return examData;
  }
}

const renderQuestionManager = (examId) => {
  previewContainer.innerHTML = `
<div>
  edit exam...${examId}
</div>
`;
};

const studentDashboard = () => {
  // TODO: (douae).
  // student dashboard goes here...
  previewContainer.innerHTML = `
   <div id="dashboard-view" class=" p-6">
                    <h1 class="text-2xl font-bold text-emerald-600 dark:text-violet-400 mb-6">Tableau de bord étudiant</h1>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div class="bg-white dark:bg-zinc-700 p-6 rounded-lg shadow">
                            <h2 class="text-lg font-semibold mb-4 flex items-center">
                                <i class="fas fa-link text-emerald-500 dark:text-violet-400 mr-2"></i>
                                Accéder à un examen
                            </h2>
                            <p class="text-zinc-600 dark:text-zinc-300 mb-4">Entrez le lien d'invitation partagé par votre enseignant</p>
                            <div class="flex">
                                <input type="text" id="exam-link" placeholder="Coller le lien ici" 
                                    class="flex-1 py-2 px-3 border border-gray-300 dark:border-zinc-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500 bg-white dark:bg-zinc-800">
                                <button id="access-exam-btn" 
                                    class="px-4 py-2 bg-emerald-500 dark:bg-violet-500 text-white rounded-r-md hover:bg-emerald-600 dark:hover:bg-violet-600">
                                    Accéder
                                </button>
                            </div>
                        </div>
                        
                        <div class="bg-white dark:bg-zinc-700 p-6 rounded-lg shadow">
                            <h2 class="text-lg font-semibold mb-4 flex items-center">
                                <i class="fas fa-chart-pie text-emerald-500 dark:text-violet-400 mr-2"></i>
                                Statistiques
                            </h2>
                            <div class="space-y-4">
                                <div class="flex justify-between">
                                    <span class="text-zinc-600 dark:text-zinc-300">Examens complétés</span>
                                    <span class="font-semibold">2</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-zinc-600 dark:text-zinc-300">Note moyenne</span>
                                    <span class="font-semibold">72/100</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-zinc-600 dark:text-zinc-300">Dernière participation</span>
                                    <span class="font-semibold">08/05/2025</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white dark:bg-zinc-700 p-6 rounded-lg shadow mb-6">
                        <h2 class="text-lg font-semibold mb-4 flex items-center">
                            <i class="fas fa-calendar-alt text-emerald-500 dark:text-violet-400 mr-2"></i>
                            Examens récents
                        </h2>
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200 dark:divide-zinc-600">
                                <thead>
                                    <tr>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Titre</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Date</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Score</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white dark:bg-zinc-700 divide-y divide-gray-200 dark:divide-zinc-600">
                                    <tr>
                                        <td class="px-6 py-4 whitespace-nowrap">Programmation Web</td>
                                        <td class="px-6 py-4 whitespace-nowrap">08/05/2025</td>
                                        <td class="px-6 py-4 whitespace-nowrap">85/100</td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                                                Complété
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="px-6 py-4 whitespace-nowrap">Base de données SQL</td>
                                        <td class="px-6 py-4 whitespace-nowrap">02/05/2025</td>
                                        <td class="px-6 py-4 whitespace-nowrap">67/100</td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                                                Complété
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
  `;





};

// Home page
function renderHomePage() {
  const user = getUser();
  console.log("home page, user is : ", user);

  previewContainer.innerHTML = `
    <div class="flex flex-col items-center justify-center h-full">
      <h1 class="text-4xl font-bold mb-4 font-sora">Welcome to Exami</h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">Your platform to create/pass exams.</p>
      <div class="flex space-x-4">
        <button id="start-btn" class="px-6 py-2  bg-gray-200 dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors">Get started</button>
      </div>
    </div>
  `;

  const startButton = document.getElementById("start-btn");

  startButton.addEventListener("click", () => {
    console.log("starting...");
    if (user.type === "student") {
      navigateTo("student-dashboard");
    } else {
      navigateTo("teacher-dashboard");
    }
  });
}

// Not found page
function renderNotFoundPage() {
  const user = getUser;
  previewContainer.innerHTML = `
    <div class="flex flex-col items-center justify-center h-full font-sora">
      <h1 class="text-4xl font-bold mb-3">404</h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">Oops! - Page not found</p>
      <a id="got-home-btn" href="${user.type === "student" ? "#student-dashboard" : "#teacher-dashboard"}" class="px-3 py-1 bg-emerald-500 dark:bg-violet-500 border-emerald-600 dark:border-violet-400   text-white rounded-lg hover:bg-emerald-600 dark:hover:bg-violet-600 transition-colors">Go Home</button>
    </div>
  `;

  // document.getElementById("got-home-btn").addEventListener("click", () => {
  //   const path =
  //     user.type === "student" ? "student-dashboard" : "teacher-dashboard";
  //   window.location.hash = path;
  // });
}

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
