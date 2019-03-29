var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// DB Config
const user = "mongo";
const password = "mongo";
const dbName = "vidjot-dev";
const cloudDbUrl =
  "mongodb://" +
  user +
  ":" +
  password +
  "@cluster0-shard-00-00-jmygq.mongodb.net:27017,cluster0-shard-00-01-jmygq.mongodb.net:27017,cluster0-shard-00-02-jmygq.mongodb.net:27017/" +
  dbName +
  "?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";

const mongoURI = cloudDbUrl;

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

var Users = require("./routes/Users");

app.use("/users", Users);

app.listen(port, function() {
  console.log("Server is running on port: " + port);
});
