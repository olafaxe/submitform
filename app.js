//const express är en funktion som ger användning för express
//const app är en funktion som kör express
// port sätter vilken port som localhost körs på

const express = require("express");
const app = express();
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});

//const MongoCLient är en funktion som ger användning för clientsidan av Mongodb
const MongoClient = require("mongodb").MongoClient;

// beskriver vilken server mongodb kopplas till på localhost
const url = "mongodb://localhost:27017";

// Create a new MongoClient
// client är en funktion som connectar till url som man sätter ovan
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.static("views/public"));

// skapar en db variabel
let db;

app.set("view engine", "ejs");

app.use(
  express.urlencoded({
    extended: true
  })
);

//när client lyckas med connection så får db värdet av den collection som jag pekar på, i det här fallet
// collection "fake" i urlen man satt ovan
client.connect(function(err) {
  if (err) throw err;
  db = client.db("fake");
});

app.get("/", (req, res) => res.render("pages/index.ejs"));

//när man går till signup sidan så renderas signup.ejs filen
app.get("/signup", (req, res) => {
  res.render("pages/signup.ejs");
});

//när man går till users sidan får userCollection värdet av en callback function som hämtar dokument i collection fake
app.get("/users", (req, res) => {
  const usersCollection = db.collection("users");

  //ta faktiskt fram alla users i fake
  usersCollection.find({}).toArray(function(err, users) {
    //skicka ut users i fake på sidan /users
    let output = users;
    res.render("pages/users.ejs", { output });
  });
});

//när man går till sidan signup så får username värdet av inputen med id username
//userCollection är en funktion som får fram dokument med users
app.post("/signup", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const usersCollection = db.collection("users");

  //signup.ejs renderas och det du skrev in som username skickas som variabel till signup.ejs
  res.render("pages/signup.ejs", { username, email });
  //lägger till insrkivet username i dokument users i collection fake
  usersCollection.insertMany([
    { user: username, email: email, password: password }
  ]);
});

//consollar ett meddelande när man kör igång appen som visar upp porten localhost ligger på
// app.listen(port, () => {
//   console.log(`lyssnar på ${port}`);
// });

/*  "/api/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

/*  "/api/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */
