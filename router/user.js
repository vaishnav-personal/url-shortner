const express = require("express");
const { handlecreateuser } = require("../controllers/user");

const router = express.Router();

router.post("/signup", handlecreateuser);

module.exports = router;
