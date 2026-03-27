import { post } from "../fetchManager.mjs";
import i18n from "../i18nClient.mjs";
import loadView from "../viewLoader.mjs";
import { initRegisterController } from "./registerController.mjs";
import { initProfileController } from "./profileController.mjs";

export function initLoginController() {
    const form = document.getElementById("login-form");
    const loginPageBtn = document.getElementById("registerPageBtn");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const userData = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
        };

        try {
            const response = await post("./user/login", userData);

            if (response.error) {
                alert(i18n.errorCodes[response.error] || response.error);
            } else {
                localStorage.setItem("token", response.token);

                const template = await loadView("profileView");
                const app = document.getElementById("app");
                app.replaceChildren();
                app.appendChild(template.content.cloneNode(true));

                initProfileController();
            }
        } catch {
            alert(i18n.errorCodes.networkError);
        }
    });

    loginPageBtn.addEventListener("click", async () => {
        const template = await loadView("registerView");
        const app = document.getElementById("app");
        app.replaceChildren();
        app.appendChild(template.content.cloneNode(true));
        initRegisterController();
    });
}