const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
        required: true
    },

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date,
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["booked", "cancelled"],
        default: "booked"
    }

}, {
    timestamps: true
});

const Reservation = mongoose.model(
    "Reservation",
    reservationSchema
);

module.exports = Reservation;