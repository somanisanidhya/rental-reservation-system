import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",

        {
          email,

          password,
        },
      );

      // Store token
      localStorage.setItem(
        "token",

        response.data.token,
      );

      toast.success(response.data.message);

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handlesubmit}
        className="flex flex-col gap-4 w-80 p-6 shadow-lg rounded-lg"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />

        <button type="submit" className="bg-black text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
