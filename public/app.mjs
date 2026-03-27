import loadView from "./viewLoader.mjs";
import { initRegisterController } from "./controllers/registerController.mjs";
import { initCreateQuizController } from "./controllers/createQuizController.mjs";
import { initTakeQuizController } from "./controllers/takeQuizController.mjs";
import { initLoginController } from "./controllers/loginController.mjs";
import { initProfileController } from "./controllers/profileController.mjs";

const app = document.getElementById("app");

async function renderView(viewName, initController) {
    const template = await loadView(viewName);

    app.replaceChildren();
    app.appendChild(template.content.cloneNode(true));

    if (initController) {
        initController();
    }
}

async function initApp() {
    const token = localStorage.getItem("token");

    if (!token) {
        return renderView("loginView", initLoginController);
    }

    try {
        const response = await get("./user/profile");

        if (response.error) {
            throw new Error();
        }

        renderView("profileView", initProfileController);

    } catch {
        localStorage.removeItem("token");
        renderView("loginView", initLoginController);
    }
}

initApp();

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .catch(() => {});
    });
}