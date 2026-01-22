const mongoose = require("mongoose")

const LoginSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  name: String,
  number: String,
  password: String,
  role: { type: String, default: "user" },
  dishClicked: { type: Boolean, default: false }
})

module.exports = mongoose.model("Login", LoginSchema)
