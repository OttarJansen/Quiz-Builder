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

export async function anonymizeUser(userId) {
  const anonymousUsername = `anonymous_${crypto.randomUUID()}`;

  const query = `
    UPDATE users
    SET username = $1,
        consent = false,
        hashedpassword = NULL
    WHERE id = $2
    RETURNING *;
  `;

  const result = await pool.query(query, [anonymousUsername, userId]);

  if (result.rowCount === 0) {
    throw new Error("User not found");
  }

  return result.rows[0];
}

export async function getUserByUsername(username) {
  const query = "SELECT * FROM users WHERE username = $1";
  const result = await pool.query(query, [username]);
  return result.rows[0];
}

export function verifyPassword(plaintext, hashed) {
  if (!process.env.SECRET) {
    throw new Error("Missing SECRET environment variable");
  }

  const hmac = crypto.createHmac("sha256", process.env.SECRET);
  hmac.update(plaintext);
  return hmac.digest("hex") === hashed;
}

export function sanitizeUser(user) {
  const { hashedpassword, ...userWithoutPassword } = user;
  return userWithoutPassword;
}