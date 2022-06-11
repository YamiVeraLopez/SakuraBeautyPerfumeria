import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Login from './views/Login';
import Home from './views/Home'
import Register from './views/Register';
import ForgotPassword from './views/ForgotPassword';
import Profile from './views/Profile';
import DetailProduct from './views/DetailProduct';


function App() {
  return (
    <div className="App">
    <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/forgotPassword" element={<ForgotPassword/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/detailProduct" element={<DetailProduct/>} />
      </Routes>
    </Suspense>
  </Router>
   
      
    </div>
  );
}

export default App;
