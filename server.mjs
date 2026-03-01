import express from "express";
import dotenv from "dotenv";
import quizRouter from "./routes/quizAPI.mjs";
import userRouter from "./routes/userAPI.mjs";
import securityAudit from "./middleware/security.mjs";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(express.static("public"));
app.use("/quizzes", quizRouter);
app.use("/user", securityAudit, userRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
