import db from "../../database/db.js";
import { createNewUser } from "../actions.js";

const signupHandler = async (req, res) => {
  const { userData } = req.body;
  const { email } = userData;

  try {
    // check for user in db using unique properties.
    const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (rows.length > 0) {
      return res.status(409).send({
        message: "User already exists",
      });
    }

    const output = await createNewUser(userData);

    return res.status(output.status).send({
      message: output.text,
    });
  } catch (err) {
    console.error("DB query error: ", err);
    res.status(500).send(err);
  }
};

export default signupHandler;
