import loadView from "./viewLoader.mjs";
import { initRegisterController } from "./controllers/registerController.mjs";
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

const token = localStorage.getItem("token");

if (token) {
    renderView("profileView", initProfileController);
} else {
    renderView("loginView", initLoginController);
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .catch(() => {});
    });
}