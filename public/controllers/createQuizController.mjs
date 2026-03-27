import { post } from "../fetchManager.mjs";
import loadView from "../viewLoader.mjs";

export function initCreateQuizController() {
  const app = document.getElementById("app");
  const form = document.getElementById("create-quiz-form");
  const container = document.getElementById("questions-container");
  const addBtn = document.getElementById("add-question-btn");
  const template = document.getElementById("question-template");

  addBtn.addEventListener("click", () => {
    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const questions = [];

    container.querySelectorAll(".question").forEach(qDiv => {
      const text = qDiv.querySelector(".question-text").value;

      const options = [...qDiv.querySelectorAll(".option")]
        .map(o => o.value)
        .filter(Boolean);

      const correct = qDiv.querySelector(".correct").value;

      questions.push({
        text,
        options,
        correctOptions: [correct]
      });
    });

    const data = {
      title: document.getElementById("title").value,
      questions
    };

    try {
      const res = await post("./quizzes", data);

      if (res.error) {
        alert(res.error);
      } else {
        alert(`Quiz created! Share link: ${res.link}`);

        const template = await loadView("profileView");
        app.replaceChildren();
        app.appendChild(template.content.cloneNode(true));

        const { initProfileController } = await import("./profileController.mjs");
        initProfileController();
      }

    } catch {
      alert("Network error");
    }
  });
}