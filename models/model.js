const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true
  },
  redirectURL: {
    type: String,
    required: true
  },
  visithistory: [
    {
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // reference to User model
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("URL", urlSchema);
