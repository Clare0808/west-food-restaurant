const express = require("express")
const router = express.Router()

const Buy = require("../models/buy")

router.post("/send-buy-orders", async (req, res) => {
    const { email, list, total, code, date } = req.body

    const buy = new Buy({ email, list, total, code, date })
    await buy.save()

    res.json({
        success: true,
        message: "訂單已保存",
        buy: { email, list, total, code, date }
    })
})

router.get("/get-buy-orders", async (req, res) => {
    const buy = await Buy.find()      
    res.json(buy)
})

module.exports = router