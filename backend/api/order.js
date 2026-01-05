const express = require("express")
const router = express.Router()

const Order = require("../models/order")

router.post("/send-orders", async (req, res) => {
    const { email, name, amount, price, image, check, total } = req.body

    const order = new Order({ email, name, amount, price, image, check, total })
    await order.save()

    res.json({
        success: true,
        message: "訂單已保存",
        order: { email, name, amount, price, image, check, total }
    })
})

router.get("/get-orders", async (req, res) => {
    const orders = await Order.find()      
    res.json(orders)
})

module.exports = router