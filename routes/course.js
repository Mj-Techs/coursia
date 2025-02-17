import { Router } from "express";

const courseRouter = Router();

courseRouter.post("/course/purchase", function (req, res) {
  res.json({ msg: "purchased successfully" });
});

courseRouter.get("/courses", function (req, res) {
  res.json({
    courses: [
      {
        id: 1,
        course: "Learn system design",
      },
      {
        id: 2,
        course: "Learn full stack development",
      },
    ],
  });
});

export default courseRouter;
