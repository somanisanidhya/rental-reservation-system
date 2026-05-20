const express = require("express");
const router = express.Router();
const protect = require("../middilware/authMiddleware");
router.get("/profile", protect, (req, res) => {
   res.json({
        message: "Protected Profile Access",
        user: req.user
    });

});

module.exports = router;