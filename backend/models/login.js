const mongoose = require("mongoose")

const LoginSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  name: String,
  number: String,
  password: String,
})

module.exports = mongoose.model("Login", LoginSchema)
