import crypto from "crypto";
import pool from "../database/database.mjs";

export async function createUser({ username, consent, hashedPassword }) {
  if (!consent) {
    throw new Error("User must consent to ToS");
  }

  const userId = crypto.randomUUID();

  const query = `
    INSERT INTO users (id, username, consent, hashedpassword)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const result = await pool.query(query, [
    userId,
    username,
    consent,
    hashedPassword
  ]);

  return result.rows[0];
}

export async function deleteUser(userId) {
  const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [userId]);

  if (result.rowCount === 0) {
    throw new Error("User not found");
  }
}