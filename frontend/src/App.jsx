import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/login";
import Register from "../pages/Register";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../routes/ProtectedRoute";
import VehicleDetails from "../pages/VehicleDetails";
import MyReservations from "../pages/MyReservations";
import AdminDashboard from "../pages/AdminDashboard";
import { Toaster }from "react-hot-toast";
function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard"
         element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/vehicle/:id" 
         element={
            <ProtectedRoute>
              <VehicleDetails />
            </ProtectedRoute>}
         />
         <Route path="/my-reservations"
          element={
            <ProtectedRoute>
               <MyReservations />
            </ProtectedRoute>}
         />
         <Route path="/admin"
          element={
            <ProtectedRoute>
               <AdminDashboard />
            </ProtectedRoute>}
         />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
