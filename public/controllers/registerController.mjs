import { post } from "../fetchManager.mjs";

export function initRegisterController() {
  const form = document.getElementById("register-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userData = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      consent: document.getElementById("termsOfService").checked
    };

    const response = await post("./user", userData);

    if (response.error) {
      alert(response.error);
    } else {
      alert("User created");
      form.reset();
    }
    
  });
}
