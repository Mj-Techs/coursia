import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  creatorId: mongoose.Types.ObjectId,
});

const courseModel = mongoose.model("course", courseSchema);
export default courseModel;
