import { get, post } from "../fetchManager.mjs";
import loadView from "../viewLoader.mjs";

export async function initTakeQuizController(quizId) {
    const app = document.getElementById("app");

    const quiz = await get(`./quizzes/${quizId}`);

    if (quiz.error) {
        alert(quiz.error);
        return;
    }

    document.getElementById("quiz-title").textContent = quiz.title;

    const form = document.getElementById("quiz-form");

    quiz.questions.forEach(q => {
        const questionDiv = document.createElement("div");
        questionDiv.className = "question";

        const qText = document.createElement("p");
        qText.textContent = q.text;
        questionDiv.appendChild(qText);

        q.options.forEach(opt => {
            const label = document.createElement("label");
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = `question_${q.id}`;
            radio.value = opt.id;
            label.appendChild(radio);
            label.appendChild(document.createTextNode(opt.text));
            questionDiv.appendChild(label);
        });

        form.appendChild(questionDiv);
    });

    const submitBtn = document.getElementById("submit-quiz-btn");

    submitBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        const answers = [];

        quiz.questions.forEach(q => {
            const selected = form.querySelector(`input[name="question_${q.id}"]:checked`);
            if (selected) {
                answers.push({
                    questionId: q.id,
                    optionId: parseInt(selected.value)
                });
            }
        });

        try {
            const result = await post(`./quizzes/${quizId}/submit`, { answers });
            alert(`Score: ${result.score}/${result.total}`);

            const profileTemplate = await loadView("profileView");
            app.replaceChildren();
            app.appendChild(profileTemplate.content.cloneNode(true));

            const { initProfileController } = await import("./profileController.mjs");
            initProfileController();

        } catch {
            alert("Network error");
        }
    });
}