const express = require("express");
const URL = require("../models/model");
const router = express.Router();

router.get("/", async (req, res) => {
  const allurls = await URL.find({});
  return res.render("home", { urls: allurls });
});

router.get("/home", async (req, res) => {
  const allurls = await URL.find({});
  return res.render("home", { urls: allurls });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

module.exports = router;
