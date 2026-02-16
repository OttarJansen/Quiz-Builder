import crypto from "crypto";

const Users = {};

export function createUser({ username, consent, securityToken }) {
  if (!consent) {
    throw new Error("User must consent to ToS");
  }

  const userId = crypto.randomUUID();
  const user = {
    userId,
    username,
    consentGiven: true,
    securePassword: securityToken.securePassword
  };

  Users[userId] = user;
  return user;
}

export function deleteUser(userId) {
  if (!Users[userId]) {
    throw new Error("User not found");
  }
  delete Users[userId];
}
