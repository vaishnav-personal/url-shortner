require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("path");

const CreateMongoServer = require("./connection.js");

// Routers
const staticrouter = require("./router/staticrouter.js");
const urlroute = require("./router/url.js");
const userroute = require("./router/user.js");

const app = express();
const PORT = process.env.PORT || 8001;

// Connect DB
CreateMongoServer();
console.log("MongoDB URI:", process.env.MONGO_URL);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessions
app.use(session({
  secret: process.env.SESSION_SECRET || "your-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // set true only with HTTPS + proxy
}));

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/url", urlroute);
app.use("/user", userroute);

// put this after app.use("/user", userroute);

app.get("/login", (req, res) => {
  res.redirect("/user/login");
});

app.get("/signup", (req, res) => {
  res.redirect("/user/signup");
});
app.use("/", staticrouter);

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

// Listen
app.listen(PORT, () => {
  console.log(`✅ Server is started at port ${PORT}`);
});
