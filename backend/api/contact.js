const express = require("express")
const router = express.Router()

const Contact = require("../models/contact")

router.get("/get-contact", async (req, res) => {
    const contact = await Contact.find()      
    res.json(contact)                    
})

router.post("/send-contact", async (req, res) => {
    const { email, name, content, date } = req.body

    const contact = new Contact({ email, name, content, date })
    await contact.save()

    res.json({
        success: true,
        message: "留言傳送成功",
        user: { email, name, content, date }
    })
})

router.post("/remove-contact", async (req, res) => {
    const { list } = req.body

    for (let i = 0; i < list.length; i ++) {
        await Contact.findByIdAndDelete(list[i])
    }

    res.json({
        success: true,
        message: "留言已刪除",
    })
})

module.exports = router