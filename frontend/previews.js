import {
  renderAlert,
  updateNavbarForLoggedInUser,
  navigationUI,
} from "./main.js";
import {
  login,
  signup,
  logout,
  checkAuthStatus,
  getUser,
  getAllExams,
  createExam,
  deleteExam,
  fetchExam,
  startExamSession,
  submitExam,
} from "./utils/client-actions.js";
import { navigateTo, getParamFromUrl } from "./utils/router.js";

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
            <input
              class="w-full rounded border border-zinc-300 dark:border-zinc-600 p-2 bg-zinc-100 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500"
              type="text" id="firstname" name="firstname" required>
          </div>
          <div class="w-1/2 space-y-1">
            <label for="lastname">Last Name</label>
            <input
              class="w-full rounded border border-zinc-300 dark:border-zinc-600 p-2 bg-zinc-100 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500"
              type="text" id="lastname" name="lastname" required>
          </div>
        </div>
        <label for="email">Email</label>
        <input
          class="w-full rounded border border-zinc-300 dark:border-zinc-600 p-2 bg-zinc-100 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500"
          type="email" id="email" name="email" placeholder="eg. example@gmail.com" required>
        <div class="flex flex-col sm:flex-row gap-3 lg:gap-4">
          <div class="w-1/2 space-y-1">
            <label for="password">Password</label>
            <input
              class="w-full rounded border border-zinc-300 dark:border-zinc-600 p-2 bg-zinc-100 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500"
              type="password" id="password" name="password" required>
          </div>
          <div class="w-1/2 space-y-1">
            <label for="confPassword">Confirm Password</label>
            <input
              class="w-full rounded border border-zinc-300 dark:border-zinc-600 p-2 bg-zinc-100 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500"
              type="password" id="confPassword" name="confPassword" required>
          </div>
        </div>
        <label for="birth">Date of birth</label>
        <input
          class="w-full rounded border border-zinc-300 dark:border-zinc-600 p-2 bg-zinc-100 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500"
          type="date" id="birth" name="birth" required>
        <label for="gender">Gender</label>
        <select
          required
          id="gender"
          name="gender"
          class="w-full rounded border border-zinc-300 dark:border-zinc-600 p-2 bg-zinc-100 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500"
          <option value="" selected>Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <div 
        class="flex flex-col sm:flex-row gap-3 lg:gap-4"
        >
          <div class="w-1/2 space-y-1">
            <label  for="etablissement">Établissement</label>
            <select
              required
              id="etablissement"
              name="etablissement"
              class="w-full rounded border border-zinc-300 dark:border-zinc-600 p-2 bg-zinc-100 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500"
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
                  class="w-full rounded border border-zinc-300 dark:border-zinc-600 p-2 bg-zinc-100 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500"
                  id="type" name="type" required>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
        </div>
        <button
          id="signup-button"
          type="submit"
          class="flex justify-center items-center gap-2 w-full rounded border border-emerald-600  bg-emerald-500 dark:border-violet-400 dark:bg-violet-500 text-white py-2 focus:outline-none mt-2 md:mt-4 xl:mt-6"
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

    if (data.password !== data.confPassword) {
      renderAlert("Passwords doesn't match", "error");
      return;
    }
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
          <input
            class="w-full rounded border border-zinc-300 dark:border-zinc-600 p-2 bg-zinc-100 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500"
            type="text" id="email" name="email" required>
        </div>
        <div class="space-y-2">
          <label for="password" class="">Password</label>
          <input 
            class="w-full rounded border border-zinc-300 dark:border-zinc-600 p-2 bg-zinc-100 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500"
            type="password" id="password" name="password" required>
        </div>
        <div class="space-y-2">
          <label for="type" class="">User Type</label>
          <select 
            class="w-full rounded border border-zinc-300 dark:border-zinc-600 p-2 bg-zinc-100 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500"
            id="type" name="type" required>
            <option value="" selected>choose your role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            </select>
        </div>
        <button
          id="login-button"
          type="submit"
          class="flex justify-center items-center gap-2 w-full rounded border border-emerald-600  bg-emerald-500 dark:border-violet-400 dark:bg-violet-500 text-white py-2 focus:outline-none"
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
      navigationUI();
      if (status.userInfo.type === "student") {
        navigateTo("student-dashboard");
      } else {
        navigateTo("teacher-dashboard");
      }
    }
  });
};

const teacherDashboard = async () => {
  const user = getUser();

  previewContainer.innerHTML = `
    <div class="w-full h-full p-6 space-y-4">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="font-semibold text-3xl mb-1">Welcome back,</h3>
          <h4 class="text-xl text-emerald-500 dark:text-violet-400">Professor ${user.lastname}!</h4>
        </div>
        <a href="#create-exam" class="flex items-center gap-2 rounded-md bg-emerald-500 dark:bg-violet-500 border border-emerald-600 dark:border-violet-400 text-white px-2 py-1 text-sm shadow hover:bg-emerald-600 dark:hover:bg-violet-600">
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

  examsList.className =
    "max-h-[65dvh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4";

  result.exams.map((exam) => {
    const uniqueDeleteBtnId = `delete-btn-${exam.id}`;

    examsList.innerHTML += `
    <div class="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 shadow hover:shadow-md p-5 transition-all flex flex-col">
      <div class="mb-3">
        <h4 class="font-semibold text-xl mb-2 text-zinc-800 dark:text-zinc-100">${exam.title}</h4>
        <p class="text-sm text-zinc-600 dark:text-zinc-300 mb-2 font-sora">${exam.description}</p>
        <div class="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
          <span class="mr-1">Target:</span> ${exam.target_audience}
        </div>
        <div class="text-xs font-sora space-y-2">
          <span>
            Access link: (click to copy)
          </span>
          <button id="copy-access-link-${exam.id}" class="block">${exam.access_link}</button>
        </div>
      </div>
      <div class="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-700 w-full flex flex-row justify-between items-center">
        <a href="#edit-exam/${exam.id}"
          class="inline-flex items-center text-xs text-emerald-600 dark:text-violet-400 hover:underline"
        >
          <i class="fa-solid fa-pen-to-square mr-1"></i>
          Edit Exam
        </a>
        <button id="delete-btn-${exam.id}" class="inline-flex items-center text-xs text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors">
          <i class="fa-solid fa-trash mr-1"></i>
          Delete Exam
        </button>
      </div>
    </div>
  `;

    setTimeout(() => {
      const deleteBtn = document.getElementById(uniqueDeleteBtnId);
      const copyBtn = document.getElementById(`copy-access-link-${exam.id}`);

      if (deleteBtn) {
        deleteBtn.addEventListener("click", async () => {
          const status = await deleteExam(exam.id);
          renderAlert(status.message, status.alertType);
          if (status.alertType === "success") {
            window.location.reload();
          }
        });
      }

      if (copyBtn) {
        copyBtn.addEventListener("click", async () => {
          renderAlert(status.message, status.alertType);
          navigator.clipboard
            .writeText(exam.access_link)
            .then(() => {
              renderAlert(
                `Copied to clipboard: ${exam.access_link}`,
                "success",
              );
            })
            .catch((err) => {
              console.error("Failed to copy: ", err);
              renderAlert("Failed to copy!", "error");
            });
        });
      }
    }, 0);
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
            <button id="create-exam-btn" type="submit" class="rounded bg-emerald-500 dark:bg-violet-500 border border-emerald-600 dark:border-violet-400 text-white py-1 px-3 font-medium hover:bg-emerald-600 dark:hover:bg-violet-600">
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
      console.log("validation");
      return;
    }

    // Process form data to match the expected format
    const examData = processExamFormData();

    const submitBtn = document.getElementById("create-exam-btn");

    submitBtn.disabled;
    submitBtn.textContent = "Creating...";
    const result = await createExam(examData);
    submitBtn.textContent = "Create Exam";
    submitBtn.enabled;
    console.log("Result is (exam created) : ", result);
    renderAlert(result.message, result.alertType);

    if (result.alertType === "success") {
      navigateTo("teacher-dashboard");
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

function studentDashboard() {
  const user = getUser(); // assumed to return your provided user object
  previewContainer.innerHTML = `
    <div id="dashboard-view" class="p-6 space-y-6">
      <h1 class="text-2xl font-sora font-bold text-emerald-600 dark:text-violet-400">Welcome back, ${user.firstname} 👋</h1>
      
      <!-- Profile Info -->
      <div class="bg-white dark:bg-zinc-700 p-6 rounded-lg shadow space-y-2">
        <h2 class="text-lg font-semibold text-emerald-600 dark:text-violet-400">Your Information</h2>
        <p><strong>Full Name:</strong> ${user.firstname} ${user.lastname}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Birth Date:</strong> ${new Date(user.birth).toLocaleDateString()}</p>
        <p><strong>Gender:</strong> ${user.gender}</p>
        <p><strong>University:</strong> ${user.etablissement}</p>
      </div>

      <!-- Exam Access -->
      <div class="bg-white dark:bg-zinc-700 p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-4 flex items-center">
          <i class="fas fa-link text-emerald-500 dark:text-violet-400 mr-2"></i>
          Take an exam
        </h2>
        <p class="text-zinc-600 dark:text-zinc-300 mb-4">Enter the invitation link shared by your teacher:</p>
        <form id="access-link-form" class="flex flex-col sm:flex-row">
          <input name="accessLink" type="text" id="exam-link" placeholder="Paste exam link here..." 
            required
            class="flex-1 py-2 px-3 border border-gray-300 dark:border-zinc-600 rounded-l-md sm:rounded-none sm:rounded-l-md focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500 bg-white dark:bg-zinc-800 mb-2 sm:mb-0">
          <button type="submit" id="access-exam-btn" 
            class="px-4 py-2 bg-emerald-500 dark:bg-violet-500 text-white sm:rounded-none sm:rounded-r-md rounded-md hover:bg-emerald-600 dark:hover:bg-violet-600">
            Access
          </button>
        </form>
      </div>
    </div>
  `;

  // Add event listener to the access exam button
  const form = document.getElementById("access-link-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // TODO:
    const result = startExamSession(data.accessLink);
    console.log("results:", result);
    const examPath = `take-exam?accessLink=${data.accessLink.trim()}`;
    window.location.hash = examPath;
  });
}

const renderExamTaker = async (accessLink) => {
  // Create a loading state while we fetch the exam
  previewContainer.innerHTML = `
    <div class="w-full h-full flex flex-col items-center justify-center p-6">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 dark:border-violet-500"></div>
    </div>
  `;

  // Initialize the exam taking process
  async function initExamTaking() {
    try {
      const result = await fetchExam(accessLink);
      console.log("exam taker, result is : ", result);
      renderAlert(result.message, result.alertType);
      if (result.alertType === "success") {
        renderExamInterface(result.exam);
      }
    } catch (error) {
      console.error("Failed to load exam:", error);
      renderAlert("Failed to load exam. Please try again later.", "error");
      previewContainer.innerHTML = `
        <div class="w-full h-full p-6 flex items-center justify-center">
          <button id="back-to-dashboard" class="mt-4 bg-emerald-500 dark:bg-violet-500 text-white py-2 px-4 rounded">
            Back to Dashboard
          </button>
        </div>
      `;
      document
        .getElementById("back-to-dashboard")
        .addEventListener("click", () => {
          window.location.hash = "student-dashboard";
        });
    }
  }

  // Render the exam interface with questions
  function renderExamInterface(exam) {
    // Initialize exam state
    const examState = {
      currentQuestionIndex: 0,
      answers: Array(exam.questions.length).fill(null),
      timers: {},
      startTime: new Date(),
      timeLimit: calculateTotalTimeLimit(exam.questions),
    };

    // Function to calculate total time limit from all questions
    function calculateTotalTimeLimit(questions) {
      return questions.reduce((total, q) => total + q.duration, 0);
    }

    // Render the main exam container
    previewContainer.innerHTML = `
      <div class="p-6 flex flex-col h-full">
        <!-- Exam header -->
        <div class="mb-6 flex justify-between items-center">
          <h2 class="text-2xl font-bold">${exam.title}</h2>
          <div id="exam-timer" class="text-lg font-semibold bg-emerald-100 dark:bg-violet-900 text-emerald-800 dark:text-violet-200 px-4 py-2 rounded">
            Time Remaining: Loading...
          </div>
        </div>
        
        <!-- Exam progress bar -->
        <div class="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2.5 mb-6">
          <div id="progress-bar" class="bg-emerald-500 dark:bg-violet-500 h-2.5 rounded-full" style="width: 0%"></div>
        </div>
        
        <!-- Question container -->
        <div id="question-container" class="border-2 border-emerald-400  dark:border-zinc-600 bg-emerald-50 dark:bg-zinc-700 rounded-lg shadow-md p-6 mb-4 flex-grow">
          <!-- Question content will be dynamically inserted here -->
        </div>
        
        <!-- Question navigation -->
        <div class="flex justify-between items-center mt-4">
          <div class="flex items-center">
            <button id="prev-question" class="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 py-2 px-4 rounded-l disabled:opacity-50">
              <i class="fa-solid fa-chevron-left"></i>
            </button>
            <div class="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 py-2 px-4">
              <span id="current-question">1</span> / <span id="total-questions">${exam.questions.length}</span>
            </div>
            <button id="next-question" class="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 py-2 px-4 rounded-r disabled:opacity-50">
              <i class="fa-solid fa-chevron-right"></i>
            </button>
            <span id="question-status" class="ml-3 text-sm text-zinc-500 dark:text-zinc-400">
              <!-- Status indicator will appear here -->
            </span>
          </div>
          <button id="finish-exam" class="bg-emerald-500 dark:bg-violet-500 text-white py-2 px-6 rounded hover:bg-emerald-600 dark:hover:bg-violet-600 transition">
            Submit Exam
          </button>
        </div>
        
        <!-- Question list for quick navigation -->
        <div class="mt-6">
          <h3 class="text-sm font-semibold mb-2">Question Navigator:</h3>
          <div id="question-navigator" class="flex flex-wrap gap-2">
            <!-- Question buttons will be dynamically inserted here -->
          </div>
        </div>
      </div>
    `;

    // Populate question navigator
    const questionNavigator = document.getElementById("question-navigator");
    exam.questions.forEach((_, index) => {
      const button = document.createElement("button");
      button.className =
        "w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 flex items-center justify-center text-sm";
      button.textContent = index + 1;
      button.addEventListener("click", () => {
        navigateToQuestion(index);
      });
      questionNavigator.appendChild(button);
    });

    // Render initial question
    renderQuestion(examState.currentQuestionIndex);

    // Set up navigation buttons
    document.getElementById("prev-question").addEventListener("click", () => {
      if (examState.currentQuestionIndex > 0) {
        navigateToQuestion(examState.currentQuestionIndex - 1);
      }
    });

    document.getElementById("next-question").addEventListener("click", () => {
      if (examState.currentQuestionIndex < exam.questions.length - 1) {
        navigateToQuestion(examState.currentQuestionIndex + 1);
      }
    });

    // Set up finish exam button
    document.getElementById("finish-exam").addEventListener("click", () => {
      confirmFinishExam();
    });

    // Start the overall exam timer
    startExamTimer(examState.timeLimit);

    // Function to navigate to a specific question
    function navigateToQuestion(index) {
      // Save current answer before navigating
      saveCurrentAnswer();

      // Update current question index
      examState.currentQuestionIndex = index;

      // Render the new question
      renderQuestion(index);

      // Update UI elements
      updateNavigationButtons();
      updateProgressBar();
      updateQuestionNavigator();
    }

    // Function to save the current answer
    function saveCurrentAnswer() {
      const currentQuestion = exam.questions[examState.currentQuestionIndex];

      if (currentQuestion.type === "qcm") {
        const selectedOptions = [];
        document
          .querySelectorAll(".option-checkbox:checked")
          .forEach((checkbox) => {
            selectedOptions.push(parseInt(checkbox.value));
          });
        examState.answers[examState.currentQuestionIndex] =
          selectedOptions.length > 0 ? selectedOptions : null;
      } else if (currentQuestion.type === "direct") {
        const answerInput = document.getElementById("direct-answer");
        examState.answers[examState.currentQuestionIndex] =
          answerInput.value.trim() !== "" ? answerInput.value : null;
      }
    }

    // Function to render a specific question
    function renderQuestion(index) {
      const question = exam.questions[index];
      const questionContainer = document.getElementById("question-container");

      // Common question header
      let questionHTML = `
        <div class="mb-4">
          <div class="flex justify-between mb-2">
            <span class="font-semibold text-lg">Question ${index + 1}</span>
            <span class="text-emerald-600 dark:text-violet-400">${question.score} points</span>
          </div>
          <p class="text-lg mb-4">${question.statement}</p>
        `;

      // Add media if available
      if (question.media_url) {
        questionHTML += `
          <div class="mb-4">
            <img src="${question.media_url}" alt="Question media" class="max-w-full rounded">
          </div>
        `;
      }

      questionHTML += `</div>`;

      // Question type specific content
      if (question.type === "qcm") {
        questionHTML += `
          <div class="space-y-3">
            <p class="text-sm text-zinc-500 dark:text-zinc-400 mb-2">Select all correct options:</p>
        `;

        // Add options for QCM question
        question.qcm_options.forEach((option) => {
          const isChecked =
            examState.answers[index] &&
            examState.answers[index].includes(option.id)
              ? "checked"
              : "";
          questionHTML += `
            <div class="flex items-center">
              <input type="checkbox" id="option-${option.id}" class="option-checkbox mr-3 h-5 w-5 rounded border-zinc-300 dark:border-zinc-600" value="${option.id}" ${isChecked}>
              <label for="option-${option.id}" class="text-lg">${option.option_text}</label>
            </div>
          `;
        });

        questionHTML += `</div>`;
      } else if (question.type === "direct") {
        const savedAnswer = examState.answers[index] || "";
        questionHTML += `
          <div>
            <p class="text-sm text-zinc-500 dark:text-zinc-400 mb-2">Enter your answer:</p>
            <textarea id="direct-answer" class="w-full rounded border border-zinc-300 dark:border-zinc-600 p-3 bg-zinc-100 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500" rows="4">${savedAnswer}</textarea>
          </div>
        `;
      }

      // Question timer display
      questionHTML += `
        <div class="mt-4 flex justify-end">
          <div id="question-timer" class="text-sm bg-zinc-100 dark:bg-zinc-700 px-3 py-1 rounded">
            Time for this question: <span id="time-remaining">${question.duration}</span>s
          </div>
        </div>
      `;

      // Update the question container
      questionContainer.innerHTML = questionHTML;

      // Start question timer
      startQuestionTimer(index, question.duration);

      // Update navigation UI
      document.getElementById("current-question").textContent = index + 1;
      updateNavigationButtons();
    }

    // Function to update navigation buttons
    function updateNavigationButtons() {
      const prevButton = document.getElementById("prev-question");
      const nextButton = document.getElementById("next-question");

      prevButton.disabled = examState.currentQuestionIndex === 0;
      nextButton.disabled =
        examState.currentQuestionIndex === exam.questions.length - 1;

      // Update question status indicator
      updateQuestionStatus();
    }

    // Function to update the question status
    function updateQuestionStatus() {
      const statusElement = document.getElementById("question-status");
      const answered =
        examState.answers[examState.currentQuestionIndex] !== null;

      if (answered) {
        statusElement.innerHTML = `<span class="text-emerald-500 dark:text-emerald-400"><i class="fa-solid fa-check"></i> Answered</span>`;
      } else {
        statusElement.innerHTML = `<span class="text-orange-500"><i class="fa-solid fa-circle-exclamation"></i> Not answered</span>`;
      }
    }

    // Function to update the progress bar
    function updateProgressBar() {
      const progressBar = document.getElementById("progress-bar");
      const progress =
        ((examState.currentQuestionIndex + 1) / exam.questions.length) * 100;
      progressBar.style.width = `${progress}%`;
    }

    // Function to update the question navigator
    function updateQuestionNavigator() {
      const buttons = document.querySelectorAll("#question-navigator button");

      buttons.forEach((button, index) => {
        // Remove all classes first
        button.classList.remove(
          "bg-zinc-200",
          "dark:bg-zinc-700",
          "bg-emerald-500",
          "dark:bg-violet-500",
          "bg-orange-500",
          "text-white",
          "text-zinc-800",
          "dark:text-zinc-200",
        );

        if (index === examState.currentQuestionIndex) {
          // Current question
          button.classList.add(
            "bg-emerald-500",
            "dark:bg-violet-500",
            "text-white",
          );
        } else if (examState.answers[index] !== null) {
          // Answered question
          button.classList.add(
            "bg-emerald-200",
            "dark:bg-violet-700",
            "text-emerald-800",
            "dark:text-violet-200",
          );
        } else {
          // Unanswered question
          button.classList.add(
            "bg-zinc-200",
            "dark:bg-zinc-700",
            "text-zinc-800",
            "dark:text-zinc-200",
          );
        }
      });
    }

    // Function to start the overall exam timer
    function startExamTimer(timeLimit) {
      const timerElement = document.getElementById("exam-timer");
      let timeRemaining = timeLimit;

      function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return `${hours > 0 ? hours + "h " : ""}${minutes}m ${secs}s`;
      }

      const examInterval = setInterval(() => {
        timeRemaining--;

        timerElement.innerHTML = `Time Remaining: ${formatTime(timeRemaining)}`;

        if (timeRemaining <= 300) {
          // 5 minutes warning
          timerElement.classList.remove(
            "bg-emerald-100",
            "dark:bg-violet-900",
            "text-emerald-800",
            "dark:text-violet-200",
          );
          timerElement.classList.add(
            "bg-orange-100",
            "dark:bg-orange-900",
            "text-orange-800",
            "dark:text-orange-200",
          );
        }

        if (timeRemaining <= 60) {
          // 1 minute warning
          timerElement.classList.remove(
            "bg-orange-100",
            "dark:bg-orange-900",
            "text-orange-800",
            "dark:text-orange-200",
          );
          timerElement.classList.add(
            "bg-red-100",
            "dark:bg-red-900",
            "text-red-800",
            "dark:text-red-200",
          );
        }

        if (timeRemaining <= 0) {
          clearInterval(examInterval);
          finishExam(true);
        }
      }, 1000);

      // Store the interval ID for cleanup
      examState.examTimerInterval = examInterval;
    }

    // Function to start individual question timer
    function startQuestionTimer(questionIndex, duration) {
      // Clear any existing timer for this question
      if (examState.timers[questionIndex]) {
        clearInterval(examState.timers[questionIndex]);
      }

      const timeRemainingElement = document.getElementById("time-remaining");
      let timeRemaining = duration;

      // Set initial time
      timeRemainingElement.textContent = timeRemaining;

      const questionInterval = setInterval(() => {
        timeRemaining--;

        timeRemainingElement.textContent = timeRemaining;

        // Warning colors
        if (timeRemaining <= Math.min(10, Math.floor(duration / 4))) {
          timeRemainingElement.classList.add("text-orange-500", "font-bold");
        }

        if (timeRemaining <= Math.min(5, Math.floor(duration / 8))) {
          timeRemainingElement.classList.remove("text-orange-500");
          timeRemainingElement.classList.add("text-red-500", "animate-pulse");
        }

        if (timeRemaining <= 0) {
          clearInterval(questionInterval);

          // Auto-move to next question if not the last one
          if (questionIndex < exam.questions.length - 1) {
            navigateToQuestion(questionIndex + 1);
          }
        }
      }, 1000);

      // Store the interval ID
      examState.timers[questionIndex] = questionInterval;
    }

    // Function to confirm before finishing exam
    function confirmFinishExam() {
      // Count unanswered questions
      const unansweredCount = examState.answers.filter(
        (answer) => answer === null,
      ).length;

      // Create modal for confirmation
      const modalHTML = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white dark:bg-zinc-600 rounded-lg p-6 max-w-md w-full dark:text-white border border-zinc-300 dark:border-zinc-500">
            <h3 class="text-xl font-bold mb-4">Finish Exam?</h3>
            ${
              unansweredCount > 0
                ? `<p class="text-orange-500 mb-4"><i class="fa-solid fa-triangle-exclamation"></i> You have ${unansweredCount} unanswered question${unansweredCount > 1 ? "s" : ""}.</p>`
                : `<p class="text-emerald-500 dark:text-emerald-400 mb-4"><i class="fa-solid fa-check-circle"></i> All questions have been answered.</p>`
            }
            <p class="mb-6">Are you sure you want to submit your exam?</p>
            <div class="flex justify-end space-x-3">
              <button id="cancel-finish" class="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 py-2 px-4 rounded">
                Cancel
              </button>
              <button id="confirm-finish" class="bg-emerald-500 dark:bg-violet-500 text-white py-2 px-4 rounded">
                Submit Exam
              </button>
            </div>
          </div>
        </div>
      `;

      // Create temporary element to hold the modal
      const modalContainer = document.createElement("div");
      modalContainer.innerHTML = modalHTML;
      document.body.appendChild(modalContainer);

      // Add event listeners to buttons
      document.getElementById("cancel-finish").addEventListener("click", () => {
        document.body.removeChild(modalContainer);
      });

      document
        .getElementById("confirm-finish")
        .addEventListener("click", () => {
          document.body.removeChild(modalContainer);
          finishExam(false);
        });
    }

    // Function to finish the exam and submit answers
    function finishExam(isTimeout) {
      // Save the current answer before submitting
      saveCurrentAnswer();

      // Clear all timers
      Object.values(examState.timers).forEach((timerId) => {
        clearInterval(timerId);
      });

      if (examState.examTimerInterval) {
        clearInterval(examState.examTimerInterval);
      }

      // Calculate time taken
      const endTime = new Date();
      const timeTaken = Math.floor((endTime - examState.startTime) / 1000); // in seconds

      // Prepare submission data
      const submissionData = {
        exam_id: exam.id,
        answers: [],
        time_taken: timeTaken,
        is_timeout: isTimeout,
      };

      // Format answers for submission
      exam.questions.forEach((question, index) => {
        const answer = examState.answers[index];

        if (question.type === "qcm") {
          submissionData.answers.push({
            question_id: question.id,
            selected_options: answer || [],
          });
        } else if (question.type === "direct") {
          submissionData.answers.push({
            question_id: question.id,
            text_answer: answer || "",
          });
        }
      });

      // TODO: save data to db:
      const result = submitExam(submissionData);
      console.log("submtting result : ", result);

      // Here you would normally call an API to submit the exam
      // For now, just show a success message
      showExamCompletionScreen(submissionData, isTimeout);
    }

    // Function to show exam completion screen
    function showExamCompletionScreen(submissionData, isTimeout) {
      // Calculate some statistics
      const answeredCount = submissionData.answers.filter((a) => {
        if (Array.isArray(a.selected_options))
          return a.selected_options.length > 0;
        if (a.text_answer) return a.text_answer.trim() !== "";
        return false;
      }).length;

      const completionPercentage = Math.round(
        (answeredCount / exam.questions.length) * 100,
      );

      // Format time taken
      function formatTimeTaken(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        let result = "";
        if (hours > 0) result += `${hours} hour${hours > 1 ? "s" : ""} `;
        if (minutes > 0)
          result += `${minutes} minute${minutes > 1 ? "s" : ""} `;
        if (secs > 0 || (hours === 0 && minutes === 0))
          result += `${secs} second${secs !== 1 ? "s" : ""}`;

        return result.trim();
      }

      previewContainer.innerHTML = `
        <div class="h-full p-6 flex flex-col items-center justify-center">
          <div class="w-full max-w-md bg-white dark:bg-zinc-800 rounded-lg border border-emerald-200 dark:border-zinc-600  p-6 text-center">
            ${
              isTimeout
                ? `<div class="text-red-500 text-5xl mb-4"><i class="fa-solid fa-hourglass-end"></i></div>
              <h2 class="text-2xl font-bold mb-2">Time's Up!</h2>
              <p class="mb-6">Your exam has been automatically submitted.</p>`
                : `<div class="text-emerald-500 dark:text-emerald-400 text-5xl mb-4"><i class="fa-solid fa-check-circle"></i></div>
              <h2 class="text-2xl font-bold mb-2">Exam Submitted!</h2>
              <p class="mb-6">Your answers have been recorded successfully.</p>`
            }
            
            <div class="flex justify-between mb-4 px-4 py-3 bg-zinc-100 dark:bg-zinc-700 rounded">
              <span>Questions Answered:</span>
              <span class="font-semibold">${answeredCount} / ${exam.questions.length} (${completionPercentage}%)</span>
            </div>
            
            <div class="flex justify-between mb-6 px-4 py-3 bg-zinc-100 dark:bg-zinc-700 rounded">
              <span>Time Taken:</span>
              <span class="font-semibold">${formatTimeTaken(submissionData.time_taken)}</span>
            </div>
            
            <p class="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              Your instructor will grade your exam and provide feedback.
            </p>
            
            <button id="return-to-dashboard" class="w-full bg-emerald-500 dark:bg-violet-500 text-white py-3 px-6 rounded hover:bg-emerald-600 dark:hover:bg-violet-600 transition">
              Return to Dashboard
            </button>
          </div>
        </div>
      `;

      // Add event listener to return button
      document
        .getElementById("return-to-dashboard")
        .addEventListener("click", () => {
          window.location.hash = "student-dashboard";
        });
    }
  }

  // Start the exam taking process
  initExamTaking();
};

function renderExamResults(examId) {
  previewContainer.innerHTML = `
    <div class="p-4">
      No exams yet...
    </div>
  `;
}

// Home page
function renderHomePage() {
  const user = getUser();

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
      <a id="got-home-btn" href="${user.type === "student" ? "#student-dashboard" : "#teacher-dashboard"}" class="px-3 py-1 bg-emerald-500 dark:bg-violet-500 border-emerald-600 dark:border-violet-400   text-white rounded-lg hover:bg-emerald-600 dark:hover:bg-violet-600 transition-colors">Go Home</a>
    </div>
  `;
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
        renderExamCreator();
        break;
      case "edit-exam": {
        // TODO:
        const examId = getParamFromUrl("examId");
        renderQuestionManager(examId);
        break;
      }
      case "student-dashboard":
        studentDashboard();
        break;
      case "take-exam": {
        //TODO:
        const accessLink = getParamFromUrl("accessLink");
        renderExamTaker(accessLink);
        break;
      }
      case "exam-results": {
        //TODO:
        await renderExamResults();
        break;
      }
      case "not-found":
        renderNotFoundPage();
        break;
      default:
        renderNotFoundPage();
      // renderHomePage();
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
