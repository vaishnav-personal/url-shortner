const shortid = require("shortid");
const URL = require("../models/model");

async function CreateShortID(req, res) {
  if (!req.session.userId) {
    return res.status(401).send("Login first");
  }

  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });

  const shortIdGenerated = shortid.generate();
  const urlDoc = await URL.create({
    shortId: shortIdGenerated,
    redirectURL: body.url,
    visithistory: [],
    userId: req.session.userId
  });

  res.redirect("/"); // or send JSON response
}
  
async function updateVisitHistory(req, res) {
  try {
    const shortidParam = req.params.shortid;
    console.log("Visiting shortid:", shortidParam);

  const value = await URL.findOneAndUpdate(
  { shortId: shortidParam },
  { $push: { visithistory: { timestamp: new Date() } } },
  { new: true }
);
  console.log(value);
if (!value) {
  return res.status(404).json({ error: "Short URL not found" });
}

    let redirectURL = value.redirectURL;
    if (!redirectURL.startsWith("http://") && !redirectURL.startsWith("https://")) {
      redirectURL = "https://" + redirectURL;
    }

    res.redirect(redirectURL);
  } catch (err) {
    console.error("Update visit history error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  CreateShortID,
  updateVisitHistory
};
