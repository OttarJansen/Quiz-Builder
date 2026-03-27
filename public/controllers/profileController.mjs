import { get, del } from "../fetchManager.mjs";
import loadView from "../viewLoader.mjs";
import { initLoginController } from "./loginController.mjs";
import i18n from "../i18nClient.mjs";

export async function initProfileController() {
    const app = document.getElementById("app");

    try {
        const response = await get("./user/profile");

        if (response.error) {
            alert(response.error);
            return;
        }

        document.getElementById("username").textContent = response.user.username;

    } catch (err) {
        alert(i18n.errorCodes.failedToLoadProfile);
    }

    document.getElementById("deleteUserBtn").addEventListener("click", async () => {
        if (!confirm(i18n.feedback.accountDeletionWarning)) return;

        try {
            const userId = getUserIdFromToken();
            const response = await del(`./user/${userId}`);

            if (response.error) {
                alert(response.error);
            } else {
                alert(response.message);

                localStorage.removeItem("token");

                const template = await loadView("loginView");
                app.replaceChildren();
                app.appendChild(template.content.cloneNode(true));
                initLoginController();
            }
        } catch {
            alert(i18n.errorCodes.failedToAnonymizeUser);
        }
    });

    document.getElementById("logoutBtn").addEventListener("click", async () => {
        localStorage.removeItem("token");

        const template = await loadView("loginView");
        app.replaceChildren();
        app.appendChild(template.content.cloneNode(true));
        initLoginController();
    });
}

function getUserIdFromToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
}