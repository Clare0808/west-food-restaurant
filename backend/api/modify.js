const express = require("express")
const router = express.Router()

const Login = require("../models/login")

router.patch("/modify-data", async (req, res) => {
    const { id, column, data } = req.body

    const updatedUser = await Login.findByIdAndUpdate(
      id,
      { $set: { [column]: data } },     // 要更新的欄位
      { new: true }           // 回傳更新後的資料
    );
    res.json(updatedUser);
});

module.exports = router