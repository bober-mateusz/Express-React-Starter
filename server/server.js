const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
// parse application/json
app.use(bodyParser.json());

const port = process.env.PORT || 5000;
//Start the server

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
