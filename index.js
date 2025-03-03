import express from "express";
import dotenv from "dotenv";
import connectDB from "./modules/db/index.js"; 
import userRouter from "./routes/user.js";
import courseRouter from "./routes/course.js";
import adminRouter from "./routes/admin.js";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;
// Connect to MongoDB
(async () => {
  await connectDB();
})();

// Middleware to parse JSON
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
