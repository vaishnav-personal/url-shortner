const express = require("express");
const { handlecreateuser, handlelogin } = require("../controllers/user");
const router = express.Router();

router.post("/signup", handlecreateuser);
router.post("/login", handlelogin);

module.exports = router;
