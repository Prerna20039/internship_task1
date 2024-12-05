// src/pages/Dashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar'; // Import Sidebar component
import Overview from './components/User_List/Overview'; // Import Overview component
import Products from './components/Products/Products'; // Import Products component
// import Campaigns from './Campaigns'; // Import Campaigns component
// import Schedules from './Schedules'; // Import Schedules component
// import Payouts from './Payouts'; // Import Payouts component
// import Statements from './Statements'; // Import Statements component
// import Settings from './Settings'; // Import Settings component

const Dashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className="main-content" style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
        <Routes>
          <Route path="overview" element={<Overview />} />
          <Route path="products" element={<Products />} />
          {/* <Route path="campaigns" element={<Campaigns />} />
          <Route path="schedules" element={<Schedules />} />
          <Route path="payouts" element={<Payouts />} />
          <Route path="statements" element={<Statements />} />
          <Route path="settings" element={<Settings />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;