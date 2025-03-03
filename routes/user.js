import { Router } from "express";
import {
  ZodSignupSchema,
  ZodSigninSchema,
} from "../validations/admin_user_zod_validation.js";
import UserModel from "../Schema/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userRouter = Router();

userRouter.post("/signin", async function (req, res) {
  try {
    const { email, password } = ZodSigninSchema.parse(req.body);
    const isUserExist = await UserModel.findOne({
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
    const token = jwt.sign({ id: isUserExist._id }, process.env.USER_JWT_SECRET);
    res.json({ jwt: token });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

userRouter.post("/signup", async function (req, res) {
  try {
    const { email, password, firstName, lastName } = ZodSignupSchema.parse(
      req.body
    );
    const isUserExist = await UserModel.findOne({ email: email.toLowerCase() });
    if (isUserExist) {
      res.status(400).json({ message: "Oo! this user already exist." });
      return;
    }
    const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(password, salt);
    await UserModel.create({
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

userRouter.get("/purchases", function (req, res) {
  const { token } = req.headers;
  const isValid = jwt.verify(token, process.env.USER_JWT_SECRET);
  if (!isValid) {
    res.status(500).json({ error: "Invalid token" });
    return;
  }
  res.send("this is your purchased course");
});

export default userRouter;
