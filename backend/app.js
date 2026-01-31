const express = require("express")
const cors = require("cors")
const path = require("path")
const bcrypt = require('bcrypt')
const session = require("express-session")

const app = express()

global.__root = require('path').resolve(__dirname, "..")

app.use("/images", express.static(path.join(__root, "uploads")))
app.use("/images/_temp", express.static(path.join(__root, "uploads/_temp")))

const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err))

app.use(cors({
  origin: "http://localhost:8080",  // 前端網址
  credentials: true                 // 允許 cookie
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const loginRoutes = require("./api/login")
app.use("/api", loginRoutes)

const orderRoutes = require("./api/order")
app.use("/api", orderRoutes)

const buyRoutes = require("./api/buy")
app.use("/api", buyRoutes)

const reviewRoutes = require("./api/review")
app.use("/api", reviewRoutes)

const modifyRoutes = require("./api/modify")
app.use("/api", modifyRoutes)

const menuRoutes = require("./api/menu")
app.use("/api", menuRoutes)

const contactRoutes = require("./api/contact")
app.use("/api", contactRoutes)

const Login = require("./models/login")

// 建立管理者
async function createAdmin() {
  const admin = await Login.findOne({ role: "admin" })

  if (!admin) {
    const hashedPassword = await bcrypt.hash("admin123", 10)

    await new Login({
      email: "admin@example.com",
      name: "管理者",
      number: "00000000",
      password: hashedPassword,
      role: "admin"
    }).save()
  }
}

createAdmin()

const passport = require("./passport")

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
  })
)

// passport 初始化
app.use(passport.initialize())
app.use(passport.session())

const authRoutes = require("./api/auth")
app.use("/api", authRoutes)


app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000")
})
