import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [filterType, setFilterType] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      // Get token
      

      const response = await axios.get(
        "http://localhost:4000/api/vehicle/get",

       
      );

      setVehicles(response.data.vehicle);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch = vehicle.brand
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType =
      filterType === "" ||
      vehicle.type.toLowerCase() === filterType.toLowerCase();

    return matchesSearch && matchesType;
  });
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Vehicles</h1>
      <input
        type="text"
        placeholder="Search vehicle"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-96 mb-6"
      />
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        className="border p-2 rounded mb-6 ml-4"
      >
        <option value="">All Types</option>

        <option value="SUV">SUV</option>

        <option value="Sedan">Sedan</option>

        <option value="Sports">Sports</option>
      </select>

      <div className="grid grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle) => (
          <Link key={vehicle._id} to={`/vehicle/${vehicle._id}`}>
            <div className="shadow-lg p-4 rounded-lg">
              <img
                src={`http://localhost:4000/${vehicle.image}`}
                alt={vehicle.title}
                className="h-40 w-full object-cover rounded"
              />

              <h2 className="text-xl font-bold mt-2">{vehicle.title}</h2>

              <p>{vehicle.brand}</p>
              <p>{vehicle.type}</p>

              <p>₹ {vehicle.pricePerDay}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
