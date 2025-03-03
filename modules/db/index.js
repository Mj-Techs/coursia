import mongoose from "mongoose";
import { getLogger } from "../../commons/logger.js";
const logger = getLogger("db/index.js");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    logger.error("MongoDB Connection Error:", err);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
