import React, { useState, useEffect } from 'react';
import './Overview.css';
import AddUserModal from '../pop_up_div/AddUserModal';

const Overview = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); 

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://reqres.in/api/users?per_page=12');
        const data = await response.json();
        setUsers(data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const filteredUsers = users
    .filter(
      (user) =>
        user.first_name.toLowerCase().includes(searchTerm) ||
        user.last_name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    )
    .sort((a, b) => {
      if (sortOption === 'name') {
        return a.first_name.localeCompare(b.first_name);
      } else if (sortOption === 'id') {
        return a.id - b.id;
      }
      return 0;
    });

  const openModal = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null); 
  };

  const handleUserAdded = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleUserUpdated = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`https://reqres.in/api/users/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id)); 
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleExport = () => {
    const csvRows = [
      ['ID', 'Avatar', 'First Name', 'Last Name', 'Email'], 
      ...users.map((user) => [
        user.id,
        user.avatar,
        user.first_name,
        user.last_name,
        user.email,
      ]),
    ];

    const csvString = csvRows.map((row) => row.join(',')).join('\n');

    const blob = new Blob([csvString], { type: 'text/csv' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'user_data.csv'; 

    link.click();
  };

  return (
    <div className="overview-container">
      <div className="header">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
        <div className="sort-section">
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={handleSortChange}
            className="sort-dropdown"
          >
            <option value="">None</option>
            <option value="name">Name</option>
            <option value="id">ID</option>
          </select>

          <button className="button" onClick={openModal}>
            <i className="fas fa-user-plus"></i>Add User
          </button>
          <button className="button2" onClick={handleExport}>
            <i className="fas fa-download"></i>Export
          </button>
        </div>
      </div>

    
      <AddUserModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onUserAdded={handleUserAdded}
        onUserUpdated={handleUserUpdated} 
        selectedUser={selectedUser}
      />

      <div className="content">
        <h2>User List</h2>
        <div className="table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th> 
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    <img
                      src={user.avatar}
                      alt={`${user.first_name} ${user.last_name}`}
                      className="user-avatar"
                    />
                  </td>
                  <td>
                    {user.first_name} {user.last_name}
                  </td>
                  <td>{user.email}</td>
                  <td>
                   
                    <button
                      onClick={() => handleEditUser(user)}
                      className="icon-button edit-btn"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="icon-button delete-btn"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;
