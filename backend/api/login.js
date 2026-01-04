const express = require("express")
const router = express.Router()

const Login = require("../models/login")

router.get("/send-data", async (req, res) => {
    const login = await Login.find()      
    res.json(login)                    
})

router.post("/signup", async (req, res) => {
    const { email, name, password } = req.body

    const login = new Login({ email, name, password })
    await login.save()

    res.json({
        success: true,
        message: "註冊成功",
        user: { email, name, password }
    })
})

module.exports = router