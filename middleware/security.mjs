import { createHmac } from "node:crypto";

function securityAudit(req, res, next) {

    if (req.method === "post") {
        if (req.body.password) {
            let originalPassword = req.body.password;
            req.body.password = "";
            let securityToken = createSecurePassToken(originalPassword, process.env.SECRET);
            req.token = securityToken;
        }
    }
}

function createSecurePassToken(originalPassword, secret) {
    return {
        securePassword: hashPassword(originalPassword, secret),
        token: {}
    }
}

function hashPassword(originalPassword, secret) {
    const hmac = createHmac("sha256", secret);
    hmac.update(originalPassword);
    return hmac.digest("hex");
}

export default securityAudit;