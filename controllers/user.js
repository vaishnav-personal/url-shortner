const bcrypt = require("bcrypt");
const USER = require("../models/user.js");

async function handlecreateuser(req, res) {
  try {
    const { name, emailid, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const temp = await USER.create({ name, emailid, password: hashedPassword });
    console.log("Saved user:", temp);

    return res.redirect("/login"); // after signup go to login page
  } catch (err) {
    console.error("Error while saving user:", err);
    res.status(500).send("Failed to create user");
  }
}

async function handlelogin(req, res) {
  try {
    const { emailid, password } = req.body;
    const user = await USER.findOne({ emailid });
    if (!user) return res.status(400).send("Invalid email or password");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).send("Invalid email or password");

    req.session.userId = user._id; // store user in session
    res.redirect("/"); // go to home page
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to login");
  }
}

module.exports = { handlecreateuser, handlelogin };
