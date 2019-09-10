const express = require("express");
const app = express();
const port = 3000;

const MongoClient = require("mongodb").MongoClient;

const bodyParser = require("body-parser");

// Connection URL
const url = "mongodb://localhost:27017";

// Create a new MongoClient
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
let db;

app.set("view engine", "esj");
app.use(express.urlencoded());

//Bodyparser?
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (req, res) => res.render("pages/index.ejs"));
app.get("/signup", (req, res) => {
  res.render("pages/signup.ejs");
});

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const usersCollection = db.collection("users");

  //   res.render("pages/signup.ejs");
  console.log(req.body.username);
  res.render("pages/signup.ejs", { username });
  usersCollection.insertOne({ item: username });
});

app.listen(port, () => {
  console.log(`lyssnar på ${port}`);
});

client.connect(function(err) {
  if (err) throw err;
  db = client.db("fake");
});
app.get("/users", (req, res) => {
  const usersCollection = db.collection("users");
  usersCollection.find({}).toArray(function(err, users) {
    res.send(users);
  });
});
