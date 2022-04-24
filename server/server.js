const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const dbURI =
  "mongodb+srv://matBob123:Hashbit123@projectdb.n14aw.mongodb.net/FYP-DB?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("connected to db"))
  .catch((err) => console.log(err));

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
