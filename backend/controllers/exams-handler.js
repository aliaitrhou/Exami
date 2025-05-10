import db from "../../database/db.js";
import { randomUUID } from "crypto";

// to genrate unique link for exams:
function generateUniqueLink() {
  return `exam-${randomUUID()}`;
}

// for teacher routes:
//api/exams
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
