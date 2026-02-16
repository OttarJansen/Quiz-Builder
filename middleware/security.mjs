import { createHmac } from "node:crypto";

function securityAudit(req, res, next) {

    if (req.method === "POST") {
        if (req.body.password) {
            let originalPassword = req.body.password;
            req.body.password = "";
            let securityToken = createSecurePassToken(originalPassword, process.env.SECRET);
            req.token = securityToken;
        }
    } 

    next();
}

function createSecurePassToken(originalPassword, secret) {
    return {
        securePassword: hashPassword(originalPassword, secret),
        token: {}
    }
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