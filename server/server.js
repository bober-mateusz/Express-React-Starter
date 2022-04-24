const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const app = express();
const dbURI =
  "mongodb+srv://matBob123:Hashbit123@fyp.ietti.mongodb.net/FypDB?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("connected to db"))
  .catch((err) => console.log(err));

//Mongoose tests
app.get("/add-user", (req, res) => {
  const user = new User({
    username: "JimBob8",
    password: "password12345",
    email: "myemail@gmail.com"
  });
  user
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/get-users", (req, res) => {
  User.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/single-user", (req, res) => {
  User.findById("62655be786b6f22f0090b9e5")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use(cors());
// parse application/json
app.use(bodyParser.json());

const port = process.env.PORT || 5000;
//Start the server

//Start
app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "client ", "build", "index.html"));
});

app.listen(port, () => console.log(`server started on port 5000`));

// app.get("/output", (req, res) => {
//   const output = [{ data: "Some output" }];
//   res.send(output);
// });

// app.post("/post-test", (req, res) => {
//   let data = { name: req.body.name };
//   console.log(req.headers);
//   console.log("got body:", req.body, res.body);
//   res.sendStatus(200);
// });
