const fs = require("fs");
const path = require("path");
const express = require("express")
const router = express.Router()

router.post("/remove-menu", async (req, res) => {
    const id = Number(req.body.list[0]);

    const dataPath = path.join(__root, "public/data/dishData.json")

    let data = JSON.parse(fs.readFileSync(dataPath, "utf8"))

    data = data.filter(item => item.id !== id)

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    console.log("寫入 JSON =", dataPath)
    console.log("刪除後 JSON =", data)

    res.json({
        success: true,
        message: "餐點已刪除",
    })
})

module.exports = router