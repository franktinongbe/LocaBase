import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import AddHotel from './pages/AddHotel';
import AddRestaurant from './pages/AddRestaurant';
import AddBusiness from './pages/AddBusiness';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      {/* Navbar de l'application */}
      <Navbar />

      <div className="container mt-4"> {/* Pour ajouter un peu d'espace au début de chaque page */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-hotel" element={<AddHotel />} />
          <Route path="/add-restaurant" element={<AddRestaurant />} />
          <Route path="/add-business" element={<AddBusiness />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
