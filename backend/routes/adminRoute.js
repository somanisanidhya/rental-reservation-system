const express = require("express");
const router = express.Router();
const protect =require("../middilware/authMiddleware");
const {getDashboardStats} = require("../controllers/adminController");
const admin = require("../middilware/adminMiddleware");


router.get("/dashboard",protect,admin,getDashboardStats);

module.exports = router;