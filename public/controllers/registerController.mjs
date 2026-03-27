import { post } from "../fetchManager.mjs";
import i18n from "../i18nClient.mjs";
import loadView from "../viewLoader.mjs";
import { initLoginController } from "./loginController.mjs";

export function initRegisterController() {
  const form = document.getElementById("register-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userData = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      consent: document.getElementById("termsOfService").checked
    };

    try {
      const response = await post("./user", userData);
      
      if (response.error) {
        alert(i18n.errorCodes[response.error] || response.error);
      } else {
        alert(response.message);
        form.reset();
      }
    } catch (err) {
      alert(i18n.errorCodes.networkError);
    }
  });

  const loginPageBtn = document.getElementById("loginPageBtn");
  loginPageBtn.addEventListener("click", async () => {
    const template = await loadView("loginView");
    app.replaceChildren();
    app.appendChild(template.content.cloneNode(true));
    initLoginController();
  });
}