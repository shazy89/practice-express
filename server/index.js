//Main starting point of the application
const express = require("express");

const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");

//const router = require("./router");
const mongoose = require("mongoose");
//const cors = require("cors");
const app = express();
// App setup

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("server listening on:", port);
