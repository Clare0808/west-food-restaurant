const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema({
    name: String,
    stars: Number,
    content: String,
    date: String,
})
  
module.exports = mongoose.model("Review", ReviewSchema)