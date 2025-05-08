import { renderPreview } from "../previews.js";

import { renderAlert } from "../main.js";
import { isLoggedIn, getUserType } from "./client-actions.js";

// Define routes and their access requirements
const routes = {
  home: {
    access: "public",
  },
  login: {
    access: "public",
  },
  signup: {
    access: "public",
  },
  "teacher-dashboard": {
    access: "teacher",
    requiresAuth: true,
  },
  "create-exam": {
    access: "teacher",
    requiresAuth: true,
  },
  "edit-exam": {
    access: "teacher",
    requiresAuth: true,
    params: ["examId"],
  },
  "student-dashboard": {
    access: "student",
    requiresAuth: true,
  },
  "take-exam": {
    access: "student",
    requiresAuth: true,
    params: ["examId"],
  },
  "exam-results": {
    access: "both",
    requiresAuth: true,
    params: ["examId"],
  },
};

// Initialize router with hash-based navigation
export function initRouter() {
  window.addEventListener("hashchange", () => {
    const path = window.location.hash.substring(1).split("?")[0] || "home";
    navigateTo(path);
  });
}

// Navigate to a specific route
export function navigateTo(path, params = {}) {
  const route = routes[path];

  if (!route) {
    renderPreview("not-found");
    return;
  }

  // Check authentication if required
  if (route.requiresAuth && !isLoggedIn()) {
    renderAlert("Please log in to access this page", "error");
    window.location.hash = "login";
    return;
  }

  // Check user type if restricted
  if (route.access !== "public" && route.access !== "both") {
    const userType = getUserType();
    if (route.access !== userType) {
      renderAlert("You do not have permission to access this page", "error");
      const redirectPath =
        userType === "teacher" ? "teacher-dashboard" : "student-dashboard";
      window.location.hash = redirectPath;
      return;
    }
  }

  // Check required parameters
  if (route.params) {
    for (const param of route.params) {
      if (!params[param] && !getParamFromUrl(param)) {
        renderAlert(`Missing required parameter: ${param}`, "error");
        const redirectPath =
          getUserType() === "teacher"
            ? "teacher-dashboard"
            : "student-dashboard";
        window.location.hash = redirectPath;
        return;
      }
    }
  }

  // Build URL if params provided
  if (Object.keys(params).length > 0) {
    const queryString = Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join("&");
    window.location.hash = `${path}?${queryString}`;
    return;
  }

  // Render the preview
  renderPreview(path);
}

// Get parameter from URL query string
export function getParamFromUrl(param) {
  const queryString = window.location.hash.split("?")[1] || "";
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}
