import { get, post } from "../fetchManager.mjs";

export async function initTakeQuizController(quizId) {
    const app = document.getElementById("app");
    const form = document.getElementById("quiz-form");
    const titleElem = document.getElementById("quiz-title");
    const submitBtn = document.getElementById("submit-quiz-btn");

    let quiz;
    try {
        quiz = await get(`./quizzes/${quizId}`);
        if (quiz.error) throw new Error(quiz.error);
    } catch (err) {
        alert("Failed to load quiz: " + (err.message || err));
        return;
    }

    titleElem.textContent = quiz.title;

    quiz.questions.forEach((question, qIndex) => {
        const qDiv = document.createElement("div");
        qDiv.classList.add("question");

        const qText = document.createElement("p");
        qText.textContent = `${qIndex + 1}. ${question.text}`;
        qDiv.appendChild(qText);

        question.options.forEach(option => {
            const optionLabel = document.createElement("label");
            optionLabel.style.display = "block";

            const optionInput = document.createElement("input");
            optionInput.type = "radio";
            optionInput.name = `question-${question.id}`;
            optionInput.value = option.id;

            optionLabel.appendChild(optionInput);
            optionLabel.appendChild(document.createTextNode(option.text));

            qDiv.appendChild(optionLabel);
        });

        form.appendChild(qDiv);
    });

    submitBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        const answers = [];
        quiz.questions.forEach(question => {
            const selected = form.querySelector(`input[name="question-${question.id}"]:checked`);
            if (selected) {
                answers.push({
                    questionId: question.id,
                    optionId: parseInt(selected.value)
                });
            }
        });

        try {
            const result = await post(`./quizzes/${quizId}/submit`, { answers });
            if (result.error) {
                alert(result.error);
            } else {
                alert(`You scored ${result.score} out of ${result.total}`);
            }
        } catch {
            alert("Network error submitting quiz");
        }
    });
}