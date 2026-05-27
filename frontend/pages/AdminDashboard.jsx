import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
function AdminDashboard() {
 const [loading,setLoading]= useState(false);

  const [vehicles, setVehicles] = useState([]);

  const [editId, setEditId] = useState(null);

  const [title, setTitle] = useState("");

  const [brand, setBrand] = useState("");

  const [type, setType] = useState("");

  const [pricePerDay, setPricePerDay] = useState("");

  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  // Fetch vehicles
  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:4000/api/vehicle/get",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setVehicles(response.data.vehicle);
    } catch (error) {
      console.log(error);
    }
  };

  // Add or Update vehicle
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // FormData for image upload
      const formData = new FormData();

      formData.append("title", title);

      formData.append("brand", brand);

      formData.append("type", type);

      formData.append("pricePerDay", pricePerDay);

      // Only append image if selected
      if (image) {
        formData.append("image", image);
      }

      let response;

      // UPDATE VEHICLE
      if (editId) {
        response = await axios.put(
          `http://localhost:4000/api/vehicle/update/${editId}`,

          formData,

          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          },
        );
      }

      // ADD VEHICLE
      else {
        response = await axios.post(
          "http://localhost:4000/api/vehicle/add",

          formData,

          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          },
        );
      }

      toast.success(response.data.message);
      setLoading(false);

      // Refresh vehicles
      fetchVehicles();

      // Reset form
      setTitle("");

      setBrand("");

      setType("");

      setPricePerDay("");

      setImage(null);

      setEditId(null);
    } catch (error) {
     toast.error(error.response?.data?.message || "Failed");
      setLoading(false);
    }
  };

  // Delete vehicle
  const deleteVehicle = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:4000/api/vehicle/delete/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(response.data.message);

      fetchVehicles();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Price"
          value={pricePerDay}
          onChange={(e) => setPricePerDay(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 rounded"
        />

        <button disabled={loading} type="submit" className="bg-black text-white p-2 rounded">
            {loading? "Loading...": (editId? "Update Vehicle": "Add Vehicle")

   }
        </button>
      </form>

      {/* VEHICLES */}
      <div className="grid grid-cols-3 gap-6 mt-10">
        {vehicles.map((vehicle) => (
          <div key={vehicle._id} className="shadow-lg p-4 rounded-lg">
            <img
              src={`http://localhost:4000/${vehicle.image}`}
              alt={vehicle.title}
              className="h-40 w-full object-cover rounded"
            />

            <h2 className="text-xl font-bold mt-2">{vehicle.title}</h2>

            <p>{vehicle.brand}</p>

            <p>{vehicle.type}</p>

            <p>₹ {vehicle.pricePerDay}</p>

            {/* DELETE BUTTON */}
            <button
              onClick={() => deleteVehicle(vehicle._id)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
              Delete
            </button>

            {/* EDIT BUTTON */}
            <button
              onClick={() => {
                setEditId(vehicle._id);

                setTitle(vehicle.title);

                setBrand(vehicle.brand);

                setType(vehicle.type);

                setPricePerDay(vehicle.pricePerDay);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 ml-2"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
