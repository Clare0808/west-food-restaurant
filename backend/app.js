const express = require("express")
const cors = require("cors")

const app = express()

const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err))

app.use(cors())
app.use(express.json())

const loginRoutes = require("./api/login")
app.use("/api", loginRoutes)

const orderRoutes = require("./api/order")
app.use("/api", orderRoutes)

const buyRoutes = require("./api/buy")
app.use("/api", buyRoutes)

const reviewRoutes = require("./api/review")
app.use("/api", reviewRoutes)

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000")
})
