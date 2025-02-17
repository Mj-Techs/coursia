import express from "express";
import userRouter from "./routes/user.js";
import courseRouter from './routes/course.js'
import adminRouter from "./routes/admin.js";
const app = express();
const PORT = 5000;

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use('/admin',adminRouter)
app.listen(PORT, () => {
  console.log(`Server is listening on PORT:${PORT}`);
});
