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

router.post("/upload-image", upload.single("image"), (req, res) => {
    try {
        console.log("FILE:", req.file);

        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        res.status(200).json({
            imageUrl: req.file.path
        });

    } catch (error) {

        console.error("UPLOAD ERROR:", JSON.stringify(error, null, 2));
        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;