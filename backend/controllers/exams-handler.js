import db from "../../database/db.js";
import { randomUUID } from "crypto";
import levenshtein from "fastest-levenshtein";

// to genrate unique link for exams:
function generateUniqueLink() {
  return `exam-${randomUUID()}`;
}

// for teacher routes:
export const createNewExam = async (req, res) => {
  const data = req.body;
  const user = req.user;
  //TODO: use user data from req.

  // if the id is zero
  // update the teacher id
  // using user object
  let teacherId = data.teacher_id;
  if (teacherId === 0) {
    teacherId = user.userId;
  }

  console.log("create exam, (teacher id ):", teacherId);
  // exams:
  try {
    const examRes = await db.query(
      `INSERT INTO exams (title, description, target_audience, teacher_id, access_link)
    VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [
        data.title,
        data.description,
        data.target_audience,
        teacherId,
        generateUniqueLink(),
      ],
    );
    const examId = examRes.rows[0].id;

    // questions:
    for (const q of data.questions) {
      const questionRes = await db.query(
        `INSERT INTO questions (exam_id, type, statement, media_url, correct_answer, tolerance, duration, score)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
        [
          examId,
          q.type,
          q.statement,
          q.media_url,
          q.type === "direct" ? q.correct_answer : null,
          q.type === "direct" ? q.tolerance : null,
          q.duration,
          q.score,
        ],
      );
      const questionId = questionRes.rows[0].id;

      // qcm_options:
      if (q.type === "qcm" && q.qcm_options) {
        for (const opt of q.qcm_options) {
          await db.query(
            `INSERT INTO qcm_options (question_id, option_text, is_correct)
          VALUES ($1, $2, $3)`,
            [questionId, opt.option_text, opt.is_correct],
          );
        }
      }
    }
    return res.status(200).json({
      message: "Exam created successfully!",
    });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getExamDetails = (req, res) => {
  const examId = req.params.examId;
  console.log("examId is : ", examId);
  const user = req.user;
  console.log(user);
  // todo
};

export const updateExamInfo = (req, res) => {
  // todo
};
// /api/exams/:examId
export const deleteExam = async (req, res) => {
  const examId = req.params.examId;
  console.log("Exam id (server) : ", examId);

  try {
    await db.query("DELETE FROM exams WHERE id = $1", [examId]);

    return res.status(200).json({
      message: "Exam deleted successfully!",
    });
  } catch (e) {
    console.error("Error : ", e);
    return res.status(500).json({
      message: e.message,
    });
    // todo
  }
};

//api/exams/teacher/:teacherId
export const getExamsByTeacher = async (req, res) => {
  const { teacherId } = req.params;
  console.log("teacher id : ", teacherId);
  // TODO: use real teacher id later.
  try {
    const { rows } = await db.query(
      "SELECT * FROM exams WHERE teacher_id = $1",
      [teacherId],
    );

    console.log("rows are : ", rows);

    return res.status(200).json({
      exams: rows,
    });
  } catch (e) {
    console.error("Error : ", e);
    return res.status(500).json({
      message: e.message,
    });
  }

  // todo
};

// student routes:
//"/api/exams/access/:uniqueLink", getExamInfo);
export const getExamInfo = async (req, res) => {
  const { uniqueLink } = req.params;
  console.log("unique link is :", uniqueLink);

  try {
    // 1️⃣ Get exam details
    const examRes = await db.query(
      `SELECT id, title, description, target_audience FROM exams WHERE access_link = $1`,
      [uniqueLink],
    );

    if (examRes.rowCount === 0) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const exam = examRes.rows[0];

    // 2️⃣ Get questions
    const questionsRes = await db.query(
      `SELECT * FROM questions WHERE exam_id = $1`,
      [exam.id],
    );

    const questions = [];

    for (const q of questionsRes.rows) {
      let qcm_options = [];

      // 3️⃣ If QCM, get options
      if (q.type === "qcm") {
        const optionsRes = await db.query(
          `SELECT id, option_text, is_correct FROM qcm_options WHERE question_id = $1`,
          [q.id],
        );
        qcm_options = optionsRes.rows;
      }

      questions.push({
        id: q.id,
        type: q.type,
        statement: q.statement,
        media_url: q.media_url,
        correct_answer: q.correct_answer,
        tolerance: q.tolerance,
        duration: q.duration,
        score: q.score,
        qcm_options,
      });
    }

    return res.status(200).json({
      id: exam.id,
      title: exam.title,
      description: exam.description,
      target_audience: exam.target_audience,
      questions,
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      message: "Failed to fetch exam",
    });
  }
};

// app.post("/api/exams/:examId/start", startExam);
export const startExam = async (req, res) => {
  console.log("start exam..");
  const accessLink = req.params.examId;

  const examRes = await db.query(
    `SELECT id FROM exams WHERE access_link = $1`,
    [accessLink],
  );

  if (examRes.rowCount === 0) {
    return res.status(404).json({ message: "Exam not found" });
  }

  const examId = examRes.rows[0].id;

  const studentId = req.user.userId;
  const { geolocation } = req.body;

  try {
    const sessionRes = await db.query(
      `INSERT INTO exam_sessions (exam_id, student_id, start_time, geolocation)
       VALUES ($1, $2, NOW(), $3)
       RETURNING id`,
      [examId, studentId, geolocation || null],
    );

    return res.status(201).json({
      session_id: sessionRes.rows[0].id,
      message: "Exam session started",
    });
  } catch (err) {
    console.error("startExam error:", err);
    return res.status(500).json({ message: "Failed to start exam session" });
  }
};

// app.post("/api/exams/:examId/submit", submitExam);
export const submitExam = async (req, res) => {
  const { exam_id, answers, time_taken, is_timeout } = req.body;
  const student_id = req.user.id;

  try {
    // 1. Validate exam exists
    const examRes = await db.query(
      `SELECT access_link FROM exams WHERE id = $1`,
      [exam_id],
    );
    if (examRes.rowCount === 0)
      return res.status(404).json({ message: "Exam not found" });

    // 2. Get latest session
    const sessionRes = await db.query(
      `SELECT id FROM exam_sessions WHERE exam_id = $1 AND student_id = $2 ORDER BY start_time DESC LIMIT 1`,
      [exam_id, student_id],
    );
    if (sessionRes.rowCount === 0)
      return res.status(400).json({ message: "Exam session not found" });

    const session_id = sessionRes.rows[0].id;

    // 3. Process answers
    for (const ans of answers) {
      const qRes = await db.query(
        `SELECT * FROM questions WHERE id = $1 AND exam_id = $2`,
        [ans.question_id, exam_id],
      );
      const q = qRes.rows[0];
      if (!q) continue;

      let is_correct = false;
      let score_received = 0;

      if (q.type === "qcm") {
        const correctRes = await db.query(
          `SELECT id FROM qcm_options WHERE question_id = $1 AND is_correct = true`,
          [q.id],
        );
        const correct = correctRes.rows.map((r) => r.id).sort();
        const selected = (ans.selected_options || []).sort();

        is_correct = JSON.stringify(correct) === JSON.stringify(selected);
        score_received = is_correct ? q.score : 0;

        await db.query(
          `INSERT INTO answers (session_id, question_id, answer_text, is_correct, score_received)
           VALUES ($1, $2, $3, $4, $5)`,
          [session_id, q.id, selected.join(","), is_correct, score_received],
        );
      }

      if (q.type === "direct") {
        const input = (ans.text_answer || "").toLowerCase().trim();
        const correct = (q.correct_answer || "").toLowerCase().trim();
        const dist = levenshtein.distance(input, correct);
        const sim = 100 - (dist / correct.length) * 100;

        is_correct = sim >= 100 - q.tolerance;
        score_received = is_correct ? q.score : 0;

        await db.query(
          `INSERT INTO answers (session_id, question_id, answer_text, is_correct, score_received)
           VALUES ($1, $2, $3, $4, $5)`,
          [session_id, q.id, input, is_correct, score_received],
        );
      }
    }

    return res.status(200).json({ message: "Exam submitted successfully" });
  } catch (err) {
    console.error("submitExam error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
