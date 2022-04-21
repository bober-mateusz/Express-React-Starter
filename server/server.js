const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
// parse application/json
app.use(bodyParser.json());

app.post("/post-test", (req, res) => {
  let data = { name: req.body.name };
  console.log(req.headers);
  console.log("got body:", req.body, res.body);
  res.sendStatus(200);
});

const port = 5000;
//Start the server
app.listen(port, () => console.log(`server started on port 5000`));

app.get("/output", (req, res) => {
  const output = [{ data: "Some output" }];
  res.send(output);
});

app.get("/", (req, res) => {
  const customers = [{ data: "Hello World" }];
  res.json(customers);
});
