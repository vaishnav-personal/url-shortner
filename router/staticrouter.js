const express = require("express");
const URL = require("../models/model");
const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login"); // or show a guest page
  }
  const allurls = await URL.find({ userId: req.session.userId });
  res.render("home", { urls: allurls });
});
