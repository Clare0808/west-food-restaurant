const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    email: String,
    name: String,
    amount: Number,
    price: Number,
    image: String,
    check: Boolean,
    total: Number,
  })
  
  module.exports = mongoose.model("Order", OrderSchema)