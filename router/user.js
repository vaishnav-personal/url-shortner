const express = require("express");
const { handlecreateuser, handlelogin } = require("../controllers/user");

const router = express.Router();

// Signup
router.post("/signup", handlecreateuser);

// Login
router.post("/login", handlelogin);

module.exports = router;
