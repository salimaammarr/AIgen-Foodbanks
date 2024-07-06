import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import FoodSelection from "./pages/FoodSelection";
import MainPage from "./pages/MainPage";
import Contact from "./pages/Contact";
import About from "./pages/About";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Import any additional global CSS

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/home" element={<MainPage />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute component={Profile} />}
          />
          <Route
            path="/food-selection"
            element={<PrivateRoute component={FoodSelection} />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
