import { Router } from "express";

const userRouter = Router();

userRouter.post("/signin", function (req, res) {
  res.json({ msg: "Hi There!" });
});

userRouter.post("/signup", function (req, res) {
  res.send("Signup");
});

userRouter.get("/purchases", function (req, res) {
  res.send("this is your purchased course");
});

export default userRouter;
