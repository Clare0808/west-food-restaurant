const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const Login = require("../models/login")

router.get("/send-data", async (req, res) => {
    const login = await Login.find()      
    res.json(login)                    
})

router.post("/now-login", async (req, res) => {
    const { email } = req.body

    const user = await Login.findOne({ email })

    res.json({
        success: true,
        user: { 
            id: user._id,
            dishClicked: user.dishClicked,
            putInCartClicked: user.putInCartClicked,
            orderClicked: user.orderClicked,
            buyClicked: user.buyClicked,
            reviewClicked: user.reviewClicked,
            serverClicked: user.serverClicked
        }
    })
})

router.post("/signup", async (req, res) => {
    const { email, name, number, password } = req.body

    const existingUser = await Login.findOne({ email })
    if (existingUser) {
        return res.status(400).json({ 
            success: false,
            message: "該E-mail已存在!" 
        })
    }

    // 密碼加密
    const hashedPassword = await bcrypt.hash(password, 10)

    const login = new Login({ 
        email, 
        name, 
        number, 
        password: hashedPassword, 
        role: "user" 
    })
    await login.save()

    res.json({
        success: true,
        message: "註冊成功",
        user: {
            email, 
            name, 
            number, 
            role: login.role
        }
    })
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    const user = await Login.findOne({ email })

    if (!user) {
        return res.status(400).json({ success: false, message: "該E-mail不存在!" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.status(400).json({ success: false, message: "密碼錯誤!" })
    }

    const token = jwt.sign(
        { id: user._id, role: user.role }, 
        process.env.JWT_SECRET, 
        { expiresIn: "1h" })

    res.json({ 
        success: true, 
        message: "登入成功", 
        user: { email: user.email, name: user.name, role: user.role }, 
        token: token 
    })
})

router.post("/remove-user", async (req, res) => {
    const { list } = req.body

    for (let i = 0; i < list.length; i ++) {
        await Login.findByIdAndDelete(list[i])
    }

    res.json({
        success: true,
        message: "用戶已刪除",
    })
})

module.exports = router