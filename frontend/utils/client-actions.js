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
          <img src="${user.avatar_url}" class="border rounded-full size-7" width="80">
          <p class="font-sora text-sm">${user.name || user.login}</p>
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
export const startExamSession = async (access_link) => {
  const geoLocation = await getUserLocation();

  console.log("geoLocation:", geoLocation);

  return fetch(`/api/exams/${access_link}/start`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      geoLocation: geoLocation,
    }),
  })
    .then((res) => {
      return res.json().then((result) => {
        console.log("result is (exam session) :", result);

        if (!res.ok) {
          console.log("error creating session");
          return {
            message: "Field to create exam session!",
            alertType: "error",
          };
        }

        return {
          message: "Exam session created successfully!",
          alertType: "success",
        };
      });
    })
    .catch((error) => {
      console.error("Field to create session, error :", error);
      return {
        message: "Field to create exam session!",
        alertType: "error",
      };
    });
};

const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      console.warn("Geolocation not supported");
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Location retrieved:", position);
        const geolocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        };
        resolve(geolocation);
      },
      (error) => {
        console.error("Error getting location:", error);
        resolve(null); // Or reject(error) if you want to handle it upstream
      },
      {
        enableHighAccuracy: true,
        timeout: 10000, // increase timeout for slow devices
        maximumAge: 0,
      },
    );
  });
};

export const submitExam = async (payload) => {
  return fetch(`/api/exams/${payload.exam_id}/submit`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) =>
      res.json().then((result) => {
        console.log("result is (submit exam):", result);

        if (!res.ok) {
          return {
            message: result.message || "Failed to submit exam!",
            alertType: "error",
          };
        }

        return {
          message: "Exam submitted successfully!",
          alertType: "success",
        };
      }),
    )
    .catch((error) => {
      console.error("Failed to submit exam, error:", error);
      return {
        message: "Failed to submit exam!",
        alertType: "error",
      };
    });
};

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
    message: `Starting Exam: ${accessLink}`,
    alertType: "success",
  };
};
