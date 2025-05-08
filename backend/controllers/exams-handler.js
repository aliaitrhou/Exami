// for teacher routes:
export const createNewExam = (req, res) => {
  const user = req.user;
  console.log(user);
  // todo
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

export const deleteExam = (req, res) => {
  // todo
};

export const getExamsByTeacher = (req, res) => {
  // todo
};
