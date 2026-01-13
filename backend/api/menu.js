const fs = require("fs");
const fsExtra = require("fs-extra")
const multer = require("multer")
const path = require("path");
const express = require("express");
const router = express.Router()

// 設定 multer 的儲存方式 (檔案會先存到 uploads/_temp 資料夾)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // 確保 uploads/_temp 資料夾存在，沒有就建立
        const dir = path.join(__root, "uploads/_temp")
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
        cb(null, dir) // 指定檔案存放位置
    },
    filename: (req, file, cb) => {
        // 檔名使用前端傳來的 name + 原始副檔名
        const { name } = req.body
        const ext = path.extname(file.originalname)
        cb(null, `${name}${ext}`)
    }
})

// 建立 multer 上傳中介軟體
const upload = multer({ storage })  

router.post("/modify-menu", async (req, res) => {
    const { id, name, type, price, description, image } = req.body;
    
    const dataPath = path.join(__root, "public/data/dishData.json")

    let data = JSON.parse(fs.readFileSync(dataPath, "utf8"))

    data = data.map((item) => {
        if (item.id === id) {
            let finalImage = item.image

            // 如果圖片是暫存檔（路徑包含 _temp），就搬到正式目錄
            if (image && image.includes("_temp")) {
            const ext = path.extname(image)
            const finalDir = path.join(__root, "public/images", type || item.category)

            // 確保目標目錄存在
            if (!fs.existsSync(finalDir)) fs.mkdirSync(finalDir, { recursive: true })

            // 最終圖片路徑（給前端用的 URL）
            const finalPath = `/images/${type || item.category}/${item.name}${ext}`

            // 搬移檔案：從 uploads/_temp 搬到 public/images/...
            const srcPath = path.join(__root, "uploads/_temp", path.basename(image))
            const destPath = path.join(finalDir, `${item.name}${ext}`)
            fsExtra.moveSync(srcPath, destPath, { overwrite: true })

            finalImage = finalPath // 更新圖片路徑
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

// 上傳圖片的 API
router.post("/upload-img", upload.single("image"), (req, res) => {
    res.json({
        success: true,
        tempPath: `/images/_temp/${req.file.filename}` // 回傳暫存路徑給前端
    })
})

router.post("/add-menu", (req, res) => {
    const { id, name, type, price, description, image } = req.body;

    const dataPath = path.join(__root, "public/data/dishData.json")

    let data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

    let finalImage = image

    // 如果圖片是暫存檔（路徑包含 _temp），就搬到正式目錄
    if (image && image.includes("_temp")) {
        const ext = path.extname(image)
        const finalDir = path.join(__root, "public/images", type || category)

        // 確保目標目錄存在
        if (!fs.existsSync(finalDir)) fs.mkdirSync(finalDir, { recursive: true })

        // 最終圖片路徑（給前端用的 URL）
        const finalPath = `/images/${type || category}/${name}${ext}`

        // 搬移檔案：從 uploads/_temp 搬到 public/images/...
        const srcPath = path.join(__root, "uploads/_temp", path.basename(image))
        const destPath = path.join(finalDir, `${name}${ext}`)
        fsExtra.moveSync(srcPath, destPath, { overwrite: true })

        finalImage = finalPath // 更新圖片路徑
    }

    const newItem = {
        id,
        name,
        category: type,
        price: Number(price),
        description,
        finalImage,
    };

    data.push(newItem);

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    res.json({
        success: true,
        message: "餐點已新增",
        item: newItem,
    });
});

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