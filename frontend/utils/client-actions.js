import { updateNavbarForLoggedInUser, renderAlert } from "../main.js";
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
  console.log("git out github profiles...");
};
