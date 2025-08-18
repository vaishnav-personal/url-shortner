// controllers/user.js
const USER = require("../models/user.js");

async function handlecreateuser(req, res) {
  try {
    const { name, emailid, password } = req.body;

    const temp = await USER.create({ name, emailid, password });
    console.log("Saved user:", temp);

    return res.redirect("/");   // ✅ go to home after signup
  } catch (err) {
    console.error("Error while saving user:", err);
    res.status(500).send("Failed to create user");
  }
}

module.exports = { handlecreateuser };
