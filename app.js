const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "esj");
app.use(express.urlencoded());

app.get("/", (req, res) => res.render("pages/index.ejs"));
app.get("/signup", (req, res) => {
  res.render("pages/signup.ejs");
});

app.post("/signup", (req, res) => {
  const username = req.body.username;
  //...
  //   res.render("pages/signup.ejs");
  console.log(req.body.username);
  res.render("pages/signup.ejs", { username });
});

app.listen(port, () => {
  console.log(`lyssnar på ${port}`);
});
