import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import adminModel from "../Schema/adminSchema.js";
import {
  ZodSigninSchema,
  ZodSignupSchema,
} from "../validations/admin_user_zod_validation.js";
import { AdminMiddleware } from "../middleware/admin.js";
import courseModel from "../Schema/courseSchema.js";
import mongoose from "mongoose";
const adminRouter = Router();

adminRouter.post("/signin", async function (req, res) {
  try {
    const { email, password } = ZodSigninSchema.parse(req.body);
    const isUserExist = await adminModel.findOne({
      email: email.toLowerCase(),
    });
    if (!isUserExist) {
      res.status(403).json({ message: "User does not exist." });
      return;
    }
    const isValidUser = await bcrypt.compare(password, isUserExist.password);
    if (!isValidUser) {
      res.status(403).json({ message: "Invalid credential." });
      return;
    }
    const token = jwt.sign(
      { id: isUserExist._id },
      process.env.ADMIN_JWT_SECRET
    );
    res.json({ jwt: token });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

adminRouter.post("/signup", async function (req, res) {
  try {
    const { email, password, firstName, lastName } = ZodSignupSchema.parse(
      req.body
    );
    const existingUser = await adminModel.findOne({
      email: email.toLowerCase(),
    });
    if (existingUser) {
      res.status(400).json({ message: "Oo! this email already exist." });
      return;
    }
    const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(password, salt);
    await adminModel.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });
    res.json({ msg: "Signup successfully." });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

adminRouter.post("/course", AdminMiddleware, async function (req, res) {
  try {
    const creatorId = req.userId;
    const { title, description, price, imageUrl } = req.body;
    const course = await courseModel.create({
      title,
      description,
      price,
      imageUrl,
      creatorId,
    });
    res.json({ message: "course added successfully", courseId: course._id });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

adminRouter.put("/course/:id", AdminMiddleware, async function (req, res) {
  try {
    const { id } = req.params;
    adminId = req.userId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid course ID format" });
    }
    const updatedCourse = await courseModel.findByIdAndUpdate(
      { id, creatorId: adminId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course does not exist." });
    }

    res
      .status(200)
      .json({ message: "Course updated successfully", updatedCourse });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

adminRouter.delete(
  "/remove_course",
  AdminMiddleware,
  async function (req, res) {
    try {
      const { id } = req.body;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid course ID format" });
      }
      await courseModel.findByIdAndDelete(id);
      if (!course) {
        res.status(404).json({ message: "course does not exist." });
        return;
      }

      res.status(200).json({ message: "Course removed successfully" });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
);

adminRouter.get("/courses", AdminMiddleware, async function (req, res) {
  const adminId = req.userId;
  const courses = await courseModel.find({ creatorId: adminId });
  res.json({ courses: courses });
});
export default adminRouter;
