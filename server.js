import express from "express";
import { globalAuthMiddleware } from "./backend/middlewares.js";
import signupHandler from "./backend/controllers/signup-handler.js";
import loginHandler from "./backend/controllers/login-handler.js";
import checkAuth from "./backend/controllers/auth/check-auth.js";
import logout from "./backend/controllers/auth/logout.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// cause we are using ES module type:
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import {
  createNewExam,
  deleteExam,
  getExamDetails,
  getExamsByTeacher,
  updateExamInfo,
  getExamInfo,
  startExam,
  submitExam,
} from "./backend/controllers/exams-handler.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const port = 3000;

const app = express();
app.use(cookieParser());
app.use(express.json()); // middlewere to parse incomming json.
app.use(express.urlencoded({ extended: true }));
app.use(express.static("js-projet"));

app.use(globalAuthMiddleware);

// serve static files (css, js)
app.use(express.static(path.join(__dirname, "frontend")));

// when user request "/", serve the index html file.
app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.get("/api/", async (req, res) => {
  res.json(cookies.token);
});

// login endpoint
app.post("/api/login", loginHandler);

// signup endpoint
app.post("/api/signup", signupHandler);

// auth
app.get("/api/auth/check", checkAuth);
app.post("/api/auth/logout", logout);

// teacher routes:
app.post("/api/exams", createNewExam);
app.get("/api/exams/:examId", getExamDetails);
app.put("/api/exams/:examId", updateExamInfo);
app.delete("/api/exams/:examId", deleteExam);
app.get("/api/exams/teacher/:teacherId", getExamsByTeacher);

//TODO: add student routes:
app.get("/api/exams/access/:uniqueLink", getExamInfo);
app.post("/api/exams/:examId/start", startExam);
app.post("/api/exams/:examId/submit", submitExam);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
