const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

app.get("/signup", (req, res) => {
  const { email, password } = req.query;

  res.json({
    success: true,
    message: "註冊成功",
    user: { email }
  })
})

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000")
})
