import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import adminModel from "../Schema/adminSchema.js";
import {
  ZodSigninSchema,
  ZodSignupSchema,
} from "../validations/admin_user_zod_validation.js";

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
    const token = jwt.sign({ id: isUserExist._id }, process.env.ADMIN_JWT_SECRET);
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

adminRouter.post("/", function (req, res) {
  res.json({ msg: "course added successfully" });
});

adminRouter.put("/", function (req, res) {
  res.json({ msg: "updated course" });
});

adminRouter.delete("/", function (req, res) {
  res.json({ msg: "Course removed successfully" });
});

adminRouter.get("/courses", function (req, res) {
  const { token } = req.headers;
  const isValid = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
  if (!isValid) {
    res.status(500).json({ error: "Invalid token" });
    return;
  }
  res.json({ msg: "all courses" });
});
export default adminRouter;
