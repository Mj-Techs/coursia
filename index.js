import express from "express";

const app = express();
const PORT = 5000;

app.post("/user/signin", function (req, res) {
  res.json({ msg: "Hi There!" });
});

app.post("/user/signup", function (req, res) {
  res.send("Signup");
});

app.post('/course/purchase',function(req,res){
    res.json({msg:"purchased successfully"})
})

app.get("/user/purchases", function (req, res) {
  res.send("this is your purchased course");
});

app.get("/courses", function (req, res) {
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

app.listen(PORT, () => {
  console.log(`Server is listening on PORT:${PORT}`);
});
