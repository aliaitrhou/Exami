import db from "../../database/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../actions.js";

const loginHandler = async (req, res) => {
  try {
    const data = req.body;
    const { email, password, type } = data;

    const { rows } = await db.query(
      "SELECT * FROM users WHERE email = $1 AND type = $2",
      [email, type],
    );

    console.log("rows :", rows);

    if (rows.length === 0) {
      return res.status(401).send({
        message: "Account doesn't exist!",
        isLogedIn: false,
      });
    }

    const passwordMatch = await bcrypt.compare(password, rows[0].password);

    if (!passwordMatch) {
      return res.status(401).send({
        message: "Password doesn't match!",
        isLogedIn: false,
      });
    }

    const token = generateToken({ email, userId: rows[0].id, role: type }); // generate jwt using email for now.

    console.log("token is : ", token);

    res.cookie("token", token, {
      httpOnly: true, // TODO: change this later.
      secure: false, // NOTE: flip this to true in production (HTTPS).
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).send({
      message: "Logged in successfuly!",
      isLogedIn: true,
      user: rows[0],
    });
  } catch (err) {
    console.error("error login endpoit, errror : ", err);
    res.status(500).send({ message: err.message });
  }
};

export default loginHandler;
