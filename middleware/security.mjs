import { createHmac } from "node:crypto";

function securityAudit(req, res, next) {
  if (req.method === "POST" && req.body.password) {
    const originalPassword = req.body.password;
    req.body.password = "";

    req.body.hashedPassword = hashPassword(originalPassword, process.env.SECRET);
  }

  next();
}

function hashPassword(originalPassword, secret) {
  if (!secret) {
    throw new Error("Missing SECRET environment variable");
  }

  const hmac = createHmac("sha256", secret);
  hmac.update(originalPassword);
  return hmac.digest("hex");
}

export default securityAudit;