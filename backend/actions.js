import db from "../database/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const secret_key = process.env.JWT_SECRET;

// genearte jwt token.
export function generateToken(payload) {
  const token = jwt.sign(payload, secret_key, { expiresIn: "1h" });
  return token;
}

// create new user in database.
export const createNewUser = async (userData) => {
  try {
    // hash user password.
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const placeholders = [
      userData.firstname,
      userData.lastname,
      userData.email,
      userData.birth,
      userData.gender,
      userData.etablissement,
      userData.filiere,
      userData.type,
      hashedPassword,
    ];

    await db.query(
      `INSERT INTO users (
        firstname, lastname, email, birth, gender, etablissement, filiere, type, password
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9
      )`,
      placeholders,
    );

    return {
      status: 200,
      text: "Account created, please log in",
    };
  } catch (err) {
    console.error("Error creating new user: ", err);
    return {
      status: 500,
      text: "Someting went wrong, while creating new user!",
    };
  }
};
