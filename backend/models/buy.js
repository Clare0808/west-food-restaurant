const mongoose = require("mongoose")

const ItemSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    price: Number,
    total: Number,
})

const BuySchema = new mongoose.Schema({
    email: String,
    list: [ItemSchema],
    total: Number,
    code: String,
    date: String,
})
  
module.exports = mongoose.model("Buy", BuySchema)