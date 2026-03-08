πimport React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import Profile from "./components/Profile";
import SidebarLayout from "./components/SidebarLayout";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Redirecci√≥n desde ra√≠z a login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Todas las rutas dentro del layout con sidebar */}
        <Route element={<SidebarLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}
π"(4ca97b2405c445c06f3637ee47846ca5f01d7c512Ofile:///Users/santiagovalencia/proyecto_ingesoft2/MediSync-Proyecto/src/App.jsx:Cfile:///Users/santiagovalencia/proyecto_ingesoft2/MediSync-Proyecto