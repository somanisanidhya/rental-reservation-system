import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
function Navbar() {
  let role = "";
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwtDecode(token);

    role = decoded.role;
  }
  const navigate = useNavigate();

   const handlelogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center p-4 bg-black text-white">
      <h1 className="text-2xl font-bold">Rental System</h1>

      <div className="flex gap-4 items-center">
        <Link to="/">Home</Link>

        {token ? (
          <>
            {role === "admin" && <Link to="/admin">Admin</Link>}
            <Link to="/my-reservations">My Reservations</Link>
            <button onClick={handlelogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
