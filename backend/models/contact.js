const mongoose = require("mongoose")

const ContactSchema = new mongoose.Schema({
    email: String,
    name: String,
    content: String,
    date: String,
})
  
module.exports = mongoose.model("Contact", ContactSchema)