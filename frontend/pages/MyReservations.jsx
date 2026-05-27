import { useEffect, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";

function MyReservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:4000/api/reservation/my-bookings",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setReservations(response.data.reservations);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelReservation = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `http://localhost:4000/api/reservation/cancel/${id}`,

        {},

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(response.data.message);

      fetchReservations();
    } catch (error) {
      toast.error(error.response?.data?.message || "Cancel failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Reservations</h1>

      <div className="grid grid-cols-2 gap-6">
        {reservations.map((reservation) => (
          <div key={reservation._id} className="shadow-lg p-4 rounded-lg">
            <img
              src={`http://localhost:4000/${reservation.vehicle.image}`}
              alt={reservation.vehicle.title}
              className="h-40 w-full object-cover rounded"
            />

            <h2 className="text-xl font-bold mt-2">
              {reservation.vehicle.title}
            </h2>

            <p>{reservation.vehicle.brand}</p>

            <p>Start: {reservation.startDate.split("T")[0]}</p>

            <p>End: {reservation.endDate.split("T")[0]}</p>

            <p>₹ {reservation.totalPrice}</p>

            <p>Status: {reservation.status}</p>

            {reservation.status === "booked" && (
              <button
                onClick={() => cancelReservation(reservation._id)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-4"
              >
                Cancel
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyReservations;
