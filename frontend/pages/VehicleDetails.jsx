import { useEffect, useState } from "react";

import axios from "axios";

import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

function VehicleDetails() {
  const { id } = useParams();

  const [vehicle, setVehicle] = useState(null);

  const [startDate, setStartDate] = useState("");

  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchVehicle();
  }, []);

  const fetchVehicle = async () => {
    try {
   
      const response = await axios.get(
        `http://localhost:4000/api/vehicle/get/${id}`,

       
      );

      setVehicle(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlebooking = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:4000/api/reservation/book",

        {
          vehicleId: id,

          startDate,

          endDate,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  if (!vehicle) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <img
        src={`http://localhost:4000/${vehicle.image}`}
        alt={vehicle.title}
        className="w-full h-96 object-cover rounded"
      />

      <h1 className="text-3xl font-bold mt-4">{vehicle.title}</h1>

      <p>{vehicle.brand}</p>

      <p>₹ {vehicle.pricePerDay}</p>

      <div className="flex gap-4 mt-6">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <button
        onClick={handlebooking}
        className="bg-black text-white px-6 py-2 rounded mt-4"
      >
        Book Now
      </button>
    </div>
  );
}

export default VehicleDetails;
