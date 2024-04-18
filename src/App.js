import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Subject from "./Subject";
import AttendanceRecords from "./AttendanceRecords";
import BottomNav from "./BottomNav";
import Home from "./Home"; // Import Home component
import Contact from "./Contact"; // Import Contact component
import Profile from "./Profile"; // Import Profile component

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Define routes */}
        
        <Routes>
    <Route exact path="/" element={<Home />} /> {/* Home page */}
    <Route path="/contact" element={<Contact />} /> {/* Contact page */}
    <Route path="/profile" element={<Profile />} /> {/* Profile page */}
</Routes>


        {/* Render BottomNav component */}
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
