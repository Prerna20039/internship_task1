import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; 

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>ShubhChintak Technology</h2>
      </div>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/dashboard/overview">
            <i className="fas fa-home"></i>
            <span>User List</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/products">
            <i className="fas fa-box-open"></i>
            <span>Products</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/campaigns">
            <i className="fas fa-bullhorn"></i>
            <span>Campaigns</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/schedules">
            <i className="fas fa-calendar-alt"></i>
            <span>Schedules</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/payouts">
            <i className="fas fa-dollar-sign"></i>
            <span>Payouts</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/statements">
            <i className="fas fa-file-alt"></i>
            <span>Statements</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/settings">
            <i className="fas fa-cog"></i>
            <span>Settings</span>
          </Link>
        </li>
        <li className='nav-item'>
        <Link to="/dashboard/settings">
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;