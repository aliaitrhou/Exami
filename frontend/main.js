// get all DOM elements, and sort them in order /sidebar/navbar/dynamic-preview
const themeToggleButton = document.getElementById("theme-toggle");
const htmlElement = document.documentElement;

// theme toggling
// TODO: save theme value in local storage.
const rootElement = document.documentElement;
let darkMode = false;
themeToggleButton.addEventListener("click", () => {
  darkMode = !darkMode;

  if (darkMode) {
    rootElement.classList.add("dark");
    themeToggleButton.innerHTML = `<i class="fa-regular fa-sun"></i>`;
  } else {
    rootElement.classList.remove("dark");
    themeToggleButton.innerHTML = `
  <i class="fa-solid fa-moon"></i>
  `;
  }
});

// start the experince:
const startButtonElement = document.getElementById("start-button");
const startContainerElement = document.getElementById("start-container");
const registerFormContainer = document.getElementById(
  "register-form-container",
);

const getStarted = () => {
  startContainerElement.classList.add("hidden");
  registerFormContainer.classList.remove("hidden");

  const signupForm = document.getElementById("signup-form");

  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(signupForm);

    const data = Object.fromEntries(formData.entries());

    console.log("Form submitted! with this data: ", data);
    //TODO: call signup() with data.
  });
};

// call getStarted() function if the user clicks 'get started' or 'signup/login' buttons
startButtonElement.addEventListener("click", getStarted);

