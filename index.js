require("dotenv").config();
const express = require("express");
const CreateMongoServer = require("./connection.js");


const staticrouter = require("./router/staticrouter.js");
const urlroute = require("./router/url.js");
const userroute = require("./router/user.js");

const path = require("path");

const app = express();
const PORT = process.env.PORT || 8001;  

// connect db
CreateMongoServer();   
console.log("MongoDB URI:", process.env.MONGO_URL);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ejs setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// routes
app.use("/url", urlroute);
app.use("/user", userroute);   
app.use("/", staticrouter);

// listen
app.listen(PORT, () => {
  console.log(`✅ Server is started at port ${PORT}`);
});
