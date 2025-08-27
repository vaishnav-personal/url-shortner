const express = require("express");
const { handlecreateuser, handlelogin } = require("../controllers/user");

const router = express.Router();

// Render signup page
router.get("/signup", (req, res) => {
  res.render("signup");  // looks for views/signup.ejs
});

// Handle signup form
router.post("/signup", handlecreateuser);

// Render login page
router.get("/login", (req, res) => {
  res.render("login");  // looks for views/login.ejs
});

// Handle login form
router.post("/login", handlelogin);

module.exports = router;
