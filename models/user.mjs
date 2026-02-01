import crypto from "crypto";

const Users = {};

export function generateUserId() {
  return crypto.randomUUID();
}

export function createUser(consentGiven) {
  if (consentGiven !== true) {
    throw new Error("User must consent to ToS");
  }

  const userId = generateUserId();
  const user = {
    userId,
    consentGiven: true,
  };

  Users[userId] = user;
  return user;
}

export function deleteUser(userId) {
  delete Users[userId];
}