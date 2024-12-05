
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar'; 
import Overview from './components/User_List/Overview'; 
import Products from './components/Products/Products'; 

const Dashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className="main-content" style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
        <Routes>
          <Route path="overview" element={<Overview />} />
          <Route path="products" element={<Products />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;