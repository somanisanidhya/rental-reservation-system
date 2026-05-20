const express = require("express");
const router = express.Router();
const protect = require("../middilware/authMiddleware");
const {createReservation} = require("../controllers/reservationController");

router.post("/book", protect, createReservation);

module.exports = router;