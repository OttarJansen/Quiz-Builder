import express from "express";
import dotenv from "dotenv";
import quizRouter from "./routes/quizAPI.mjs";
import userRouter from "./routes/userAPI.mjs";
import languageMiddleware from "./middleware/language.mjs";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(express.static("public"));
app.use(languageMiddleware);
app.use("/quizzes", quizRouter);
app.use("/user", userRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
