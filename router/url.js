const express = require("express");
const { CreateShortID, updateVisitHistory } = require("../controllers/url");
const URL = require("../models/model");

const router = express.Router();

router.post("/", CreateShortID);

router.get("/:shortid", updateVisitHistory);

router.post("/delete/:id", async (req, res) => {
  try {
    await URL.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting URL:", err);
    res.status(500).send("Failed to delete URL");
  }
});



module.exports = router;
