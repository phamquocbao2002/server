const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Cấu hình nơi lưu ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "objectAvt/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

app.use(express.static(".")); // Cho phép truy cập admin.html, object.html

// API upload
app.post("/upload", upload.single("avt"), (req, res) => {
  const filePath = "/objectAvt/" + req.file.filename;
  res.json({ success: true, filePath });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
