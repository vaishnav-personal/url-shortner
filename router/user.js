const express = require("express");
const { handlecreateuser, handlelogin } = require("../controllers/user");

const router = express.Router();

// Show signup page
router.get("/signup", (req, res) => {
  res.render("signup");
});

// Handle signup
router.post("/signup", handlecreateuser);

// Show login page
router.get("/login", (req, res) => {
  res.render("login");
});

// Handle login
router.post("/login", handlelogin);

module.exports = router;
