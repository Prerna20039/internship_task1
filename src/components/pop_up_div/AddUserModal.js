import React, { useState, useEffect } from 'react';
import './AddUserModal.css'; // Add styling for modal

const AddUserModal = ({ isOpen, onClose, onUserAdded, onUserUpdated, selectedUser }) => {
  const [id, setId] = useState('');
  const [avatar, setAvatar] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  // If there's a selected user (i.e., in edit mode), pre-fill the form fields
  useEffect(() => {
    if (selectedUser) {
      setId(selectedUser.id);
      setAvatar(selectedUser.avatar);
      setFirstName(selectedUser.first_name);
      setLastName(selectedUser.last_name);
      setEmail(selectedUser.email);
    } else {
      // Reset to empty values if no selected user
      setId('');
      setAvatar('');
      setFirstName('');
      setLastName('');
      setEmail('');
    }
  }, [selectedUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create the new user object or updated user object
    const user = {
      id,
      avatar,
      first_name: firstName,
      last_name: lastName,
      email,
    };

    // Send POST or PUT request based on whether it's a new user or updating an existing one
    try {
      const response = await fetch(
        selectedUser ? `https://reqres.in/api/users/${id}` : 'https://reqres.in/api/users',
        {
          method: selectedUser ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        }
      );
  
      const data = await response.json();
  
      if (response.ok) {
        // If user is successfully added or updated, call the appropriate parent function
        if (selectedUser) {
          onUserUpdated(data);
        } else {
          onUserAdded(data);
        }
  
        // Close the modal after submitting
        onClose();
      } else {
        // Handle errors (e.g., invalid data)
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h2>{selectedUser ? 'Update User' : 'Add User'}</h2>
            <button onClick={onClose} className="close-btn">X</button>
          </div>
          <form onSubmit={handleSubmit} className="modal-form">
            <div className="input-group">
              <label>ID:</label>
              <input
                type="number"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
                disabled={selectedUser}  // Disable ID field if editing
              />
            </div>
            <div className="input-group">
              <label>Avatar URL:</label>
              <input
                type="text"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>First Name:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Last Name:</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <br />
            <div className="modal-actions">
              <button type="submit" className="submit-btn">
                {selectedUser ? 'Update' : 'Save'}
              </button>
              <button type="button" onClick={onClose} className="cancel-btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddUserModal;
