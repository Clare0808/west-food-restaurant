const express = require("express")
const router = express.Router()
const passport = require("../passport")

const Login = require("../models/login")

router.get(
    "/auth-google", 
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
)

router.get(
    "/auth-callback",
    passport.authenticate("google", {
        failureRedirect: "http://localhost:8080/login",
    }),
    (req, res) => {
        res.redirect("http://localhost:8080")  // 跳回登入畫面
    }
)

router.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Not logged in" })
  }
  res.json(req.user)
})

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("http://localhost:8080/login")
  })
})


module.exports = router