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

module.exports = router