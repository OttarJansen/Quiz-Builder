import express from "express";
import quizRouter from "./routes/quizAPI.mjs";
import userRouter from "./routes/userAPI.mjs";
import securityAudit from "./middleware/security.mjs";

const app = express();
const port = 3000;
app.use(express.json());

app.use("/quizzes", quizRouter);
app.use("/user", securityAudit, userRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
