const fs = require("fs");
const fsExtra = require("fs-extra")
const multer = require("multer")
const path = require("path");
const express = require("express");
const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__root, "public/images/_temp")
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
        cb(null, dir)
    },
    filename: (req, file, cb) => {
        const { name } = req.body
        const ext = path.extname(file.originalname)
        cb(null, `${name}${ext}`)
    }
})

const upload = multer({ storage })  

router.post("/modify-menu", async (req, res) => {
    const { id, name, type, price, description, image } = req.body;
    
    const dataPath = path.join(__root, "public/data/dishData.json")

    let data = JSON.parse(fs.readFileSync(dataPath, "utf8"))

    data = data.map((item) => {
        if (item.id === id) {
            let finalImage = item.image

            // 如果是暫存圖，才需要搬
            if (image && image.includes("_temp")) {
            const ext = path.extname(image)
            const finalDir = path.join(__root, "public/images", type || item.category)

            if (!fs.existsSync(finalDir)) fs.mkdirSync(finalDir, { recursive: true })

            const finalPath = `/images/${type || item.category}/${item.id}${ext}`

            fsExtra.moveSync(
                path.join(__root, "public", image),
                path.join(__root, "public", finalPath),
                { overwrite: true }
            )

            finalImage = finalPath
            }

            return {
            ...item,
            ...(name && { name }),
            ...(type && { category: type }),
            ...(price && { price: Number(price) }),
            ...(description && { description }),
            image: finalImage
            }
        }
        
        return item
    })

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    res.json({
        success: true,
        message: "餐點已修改",
    })
})

router.post("/upload-img", upload.single("image"), (req, res) => {
    res.json({
        success: true,
        tempPath: `/images/_temp/${req.file.filename}`
    })
})

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