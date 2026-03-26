import loadView from "./viewLoader.mjs";
import { initRegisterController } from "./controllers/registerController.mjs";
import { initLoginController } from "./controllers/loginController.mjs";

const app = document.getElementById("app");

async function renderView(viewName, initController) {
    const template = await loadView(viewName);

    app.replaceChildren();
    app.appendChild(template.content.cloneNode(true));

    if (initController) {
        initController();
    }
}

renderView("loginView", initLoginController);

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(/*(reg) => console.log("Service Worker registered", reg)*/)
            .catch(/*(err) => console.error("Service Worker failed:", err)*/);
    });
}