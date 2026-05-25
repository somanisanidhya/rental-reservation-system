const express = require("express");
const router = express.Router();
const protect = require("../middilware/authMiddleware");
const {createReservation,getUserReservations,cancelReservation} = require("../controllers/reservationController");

router.post("/book", protect, createReservation);
router.get("/my-bookings",protect,getUserReservations);
router.patch("/cancel/:id",protect,cancelReservation);
module.exports = router;