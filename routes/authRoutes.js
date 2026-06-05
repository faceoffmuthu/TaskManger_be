const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controller/authController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Auth Routes
router.post("/register",registerUser); // Register User
router.post("/login",loginUser); // Login User
router.get("/profile",protect, getUserProfile); // Get user profile
router.put("/profile",protect, updateUserProfile); // Update user profile

router.post("/upload-image", (req, res) => {
  upload.single("image")(req, res, (err) => {

    if (err) {
      console.error("MULTER ERROR:", err);

      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    res.status(200).json({
      success: true,
      imageUrl: req.file.path,
    });
  });
});

module.exports = router;