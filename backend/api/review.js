const express = require("express")
const router = express.Router()

const Review = require("../models/review")

router.get("/get-review", async (req, res) => {
    const review = await Review.find()      
    res.json(review)                    
})

router.post("/send-review", async (req, res) => {
    const { name, stars, content, date } = req.body

    const review = new Review({ name, stars, content, date })
    await review.save()

    res.json({
        success: true,
        message: "評論留言成功",
        user: { name, stars, content, date }
    })
})

router.post("/remove-review", async (req, res) => {
    const { list } = req.body

    for (let i = 0; i < list.length; i ++) {
        await Review.findByIdAndDelete(list[i])
    }

    res.json({
        success: true,
        message: "評論已刪除",
    })
})

module.exports = router