const mongoose = require("mongoose")

const LoginSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  name: String,
  number: { type: String, required: false},
  password: { type: String, required: false},  // 允許 Google 使用者沒有密碼
  googleId: { type: String, default: null},
  provider: { type: String, enum: ["local", "google"], default: "local"},
  role: { type: String, default: "user" },
  dishClicked: { type: Boolean, default: false },
  putInCartClicked: { type: Boolean, default: false },
  orderClicked: { type: Boolean, default: false},
  buyClicked: { type: Boolean, default: false},
  reviewClicked: { type: Boolean, default: false},
  serverClicked: { type: Boolean, default: false},
})

module.exports = mongoose.model("Login", LoginSchema)
