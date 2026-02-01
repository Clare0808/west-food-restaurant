const express = require("express")
const router = express.Router()
const passport = require("../passport")
const jwt = require("jsonwebtoken")

const Login = require("../models/login")

router.get(
    "/auth-google", 
    passport.authenticate("google", {
        scope: ["profile", "email"],
        prompt: "select_account"  // 強制顯示 Google 帳號選擇頁面
    })
)

router.get(
    "/auth-callback",
    passport.authenticate("google", {
        failureRedirect: "http://localhost:8080/login",
    }),
    async (req, res) => {
      res.redirect("http://localhost:8080")
    }
)

router.get("/profile", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Not logged in" })
  }

  const email = req.user.email
  const user = await Login.findOne({ email })
  
  const token = jwt.sign(
    { id: user._id, role: user.role }, 
    process.env.JWT_SECRET, 
    { expiresIn: "1h" } 
  )

  res.json({user, email})
})

router.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.clearCookie("connect.sid")
      res.json({ message: "已登出" })
    })
  })
})


module.exports = router