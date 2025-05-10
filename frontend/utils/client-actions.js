import {
  updateNavbarForLoggedInUser,
  renderAlert,
  navigationUI,
} from "../main.js";
import { navigateTo } from "./router.js";

// signup endpoint
export const signup = async (userData) => {
  console.log("user data is : ", userData);

  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userData,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.log("User already exist");
      return {
        alertMessage: result.message,
        alertType: "error",
      };
    }

    return {
      alertMessage: result.message,
      alertType: "success",
    };
  } catch (err) {
    console.log("error signing up");
    console.error("error while signing up, error: ", err);
    return {
      alertMessage: "Field to create accout, please try again!",
      alertType: "error",
    };
  }
};

// login endpoint
export const login = async (data) => {
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      console.log("response was not okey!");
      return {
        alertMessage: result.message,
        alertType: "error",
      };
    }

    console.log("result is : ", result);

    if (result.isLogedIn) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userType", result.user.type);
      localStorage.setItem("user", JSON.stringify(result.user));
    }

    return {
      alertMessage: result.message,
      alertType: "success",
      loggedIn: result.isLogedIn,
      userInfo: result.user,
    };
  } catch (e) {
    console.log("Error while loging in!");
    console.error("error login in : ", e);
  }
};

// auth funcitons:
export function isLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true";
}

export function getUserType() {
  return localStorage.getItem("userType") || "guest";
}

// if user is logged in only
export function getUser() {
  const userJson = localStorage.getItem("user");
  return userJson ? JSON.parse(userJson) : null;
}

// Log out the current user
export function logout() {
  fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.removeItem("user");
      console.log("logout data :", data);
      renderAlert(data.message, "success");
      window.location.reload();
      // navigateTo("home");
    })
    .catch((err) => console.error("Logout failed", err));
}

export function checkAuthStatus() {
  fetch("/api/auth/check")
    .then((response) => response.json())
    .then((data) => {
      if (data.isLoggedIn) {
        const user = getUser();
        navigationUI();
        updateNavbarForLoggedInUser(user);
        if (user.type === "student") {
          navigateTo("student-dashboard");
        } else {
          navigateTo("teacher-dashboard");
        }
      } else {
        navigateTo("login");
      }
    })
    .catch((error) => console.error(error));
}

export const getGithubProfiles = () => {
  const usernames = ["aliaitrhou", "DOUAE-001", "mariamkechad"];

  Promise.all(
    usernames.map((username) =>
      fetch(`https://api.github.com/users/${username}`).then((res) =>
        res.json(),
      ),
    ),
  )
    .then((users) => {
      const container = document.getElementById("contributors");
      container.className = "";
      users.forEach((user) => {
        const div = document.createElement("div");
        const link = `https://github.com/${user.login}`;

        div.innerHTML = `
        <a href="${link}" target="_blank" class="flex items-center gap-3 rounded px-2 py-1 hover:dark:bg-zinc-700">
          <img src="${user.avatar_url}" class="rounded-full size-8" width="80">
          <p>${user.name || user.login}</p>
        </a>
        `;

        container.appendChild(div);
      });
    })
    .catch((error) => console.error("Error fetching users:", error));
};

// teacher dashboard actions
export const getAllExams = async (teacherId) => {
  const res = await fetch(`/api/exams/teacher/${teacherId}`);
  const result = await res.json();

  if (!res.ok) {
    return {
      message: "Field to get exams!",
      alertType: "error",
    };
  }

  return {
    exams: result.exams,
    alertType: "success",
  };
};

export const createExam = (examData) => {
  return fetch("/api/exams", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(examData),
  })
    .then((res) => {
      return res.json().then((result) => {
        console.log("result is :", result);

        if (!res.ok) {
          console.log("error creating exam");
          return {
            message: "Field to create exam!",
            alertType: "error",
          };
        }

        return {
          message: "Exam created successfully!",
          alertType: "success",
        };
      });
    })
    .catch((error) => {
      console.error("Field to create exam, error :", error);
      return {
        message: "Field to create exam!",
        alertType: "error",
      };
    });
};

export const deleteExam = async (examId) => {
  try {
    const response = await fetch(`/api/exams/${examId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    console.log("result is : ", result);

    if (!response.ok) {
      console.log("error deleting exam");
      return {
        message: "Field to delete exam!",
        alertType: "error",
      };
    }

    return {
      message: "Exam deleted successfully!",
      alertType: "success",
    };
  } catch (error) {
    console.error("Field to delete exam, error :", error);
    return {
      message: "Field to delete exam!",
      alertType: "error",
    };
  }
};

// student actions
export const fetchExam = async (accessLink) => {
  console.log("fetch exam");
  console.log("access link: ", accessLink);

  const res = await fetch(`/api/exams/access/${accessLink}`);

  const exam = await res.json();

  if (!res.ok) {
    return {
      message: "Field to get exams!",
      alertType: "error",
    };
  }

  return {
    exam: exam,
    alertType: "success",
  };

  // return {
  //   id: accessLink,
  //   title: "Math Exam S4",
  //   description: "Final math exam for semester 4",
  //   target_audience: "2nd year MIP, S4, Group A",
  //   questions: [
  //     {
  //       id: 1,
  //       type: "qcm",
  //       statement: "What is 2 + 2?",
  //       media_url: null,
  //       duration: 30,
  //       score: 5,
  //       qcm_options: [
  //         { id: 1, option_text: "3", is_correct: false },
  //         { id: 2, option_text: "4", is_correct: true },
  //         { id: 3, option_text: "5", is_correct: false },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       type: "direct",
  //       statement: "Define integral.",
  //       media_url: null,
  //       correct_answer: "A mathematical concept...",
  //       tolerance: 10,
  //       duration: 60,
  //       score: 10,
  //     },
  //     {
  //       id: 3,
  //       type: "qcm",
  //       statement: "Which of the following are prime numbers?",
  //       media_url: null,
  //       duration: 45,
  //       score: 8,
  //       qcm_options: [
  //         { id: 4, option_text: "9", is_correct: false },
  //         { id: 5, option_text: "11", is_correct: true },
  //         { id: 6, option_text: "15", is_correct: false },
  //         { id: 7, option_text: "17", is_correct: true },
  //       ],
  //     },
  //   ],
  // };
};
