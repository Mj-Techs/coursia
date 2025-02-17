import { Router } from "express";

const adminRouter = Router();

adminRouter.post("/signin", function (Req, res) {
  res.json({ msg: "sign in successfully" });
});

adminRouter.post("/signup", function (req, res) {
  res.json({ msg: "signup successfully" });
});

adminRouter.post("/create_course", function (req, res) {
  res.json({ msg: "course added successfully" });
});

adminRouter.put("/update_course", function (req, res) {
  res.json({ msg: "updated course" });
});

adminRouter.delete("/delete", function (req, res) {
  res.json({ msg: "Course removed successfully" });
});

export default adminRouter;
