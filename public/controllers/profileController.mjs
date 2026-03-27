import { get, del } from "../fetchManager.mjs";
import loadView from "../viewLoader.mjs";
import { initLoginController } from "./loginController.mjs";
import i18n from "../i18nClient.mjs";
import { initCreateQuizController } from "./createQuizController.mjs";
import { initTakeQuizController } from "./takeQuizController.mjs";

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

    const quizListContainer = document.createElement("div");
    quizListContainer.id = "quiz-list";
    app.appendChild(quizListContainer);

    try {
        const quizzes = await get("./quizzes");
        quizzes.forEach(q => {
            const btn = document.createElement("button");
            btn.textContent = q.title;
            btn.addEventListener("click", async () => {
                const template = await loadView("takeQuizView");
                app.replaceChildren();
                app.appendChild(template.content.cloneNode(true));
                initTakeQuizController(q.id);
            });
            quizListContainer.appendChild(btn);
        });
    } catch (err) {
        console.error("Failed to load quizzes", err);
    }

    document.getElementById("deleteUserBtn").addEventListener("click", async () => {
        if (!confirm(i18n.feedback.accountDeletionWarning)) return;
        try {
            const userId = getUserIdFromToken();
            const response = await del(`./user/${userId}`);
            if (response.error) alert(response.error);
            else {
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

    document.getElementById("createQuizPageBtn").addEventListener("click", async () => {
        const template = await loadView("createQuizView");
        app.replaceChildren();
        app.appendChild(template.content.cloneNode(true));
        initCreateQuizController();
    });
}

function getUserIdFromToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
}