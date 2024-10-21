// src/components/ContactManager.js
import React, { useState } from 'react';

const ContactManager = () => {
  const [contacts, setContacts] = useState([]); // State to store all contacts
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone: '',
    tags: '',
  });

  // Regex patterns for validation
  const namePattern = /^[A-Za-z\s]+$/;  // Only alphabets and spaces
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Basic email format
  const phonePattern = /^[0-9]+$/;  // Only numbers

  // Function to handle input changes and apply validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Apply specific validation based on the field name
    if (name === 'name' && !namePattern.test(value) && value !== '') {
      alert("Name can only contain alphabetic characters and spaces.");
      return;
    }

    if (name === 'email' && !emailPattern.test(value) && value !== '') {
      alert("Please enter a valid email address.");
      return;
    }

    if (name === 'phone' && !phonePattern.test(value) && value !== '') {
      alert("Phone number can only contain numbers.");
      return;
    }

    // Update contact state with valid input
    setNewContact({
      ...newContact,
      [name]: value,
    });
  };

  // Function to handle adding a new contact
  const addContact = () => {
    if (newContact.name && newContact.email && newContact.phone) {
      setContacts([...contacts, newContact]);  // Add new contact to list
      setNewContact({ name: '', email: '', phone: '', tags: '' });  // Reset form
    } else {
      alert("Please fill in all fields correctly.");
    }
  };

  // Function to filter contacts based on search query
  const filteredContacts = contacts.filter(contact => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      contact.name.toLowerCase().includes(lowerCaseQuery) ||
      contact.email.toLowerCase().includes(lowerCaseQuery) ||
      (contact.tags && contact.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery)))
    );
  });

  return (
    <div style={{ padding: '20px' }}>
      <h1>Contact Management System</h1>

      {/* Search Bar */}
      <div
        style={{
          padding: '10px',
          width: '300px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          marginBottom: '20px',
        }}
      >
        <input
          type="text"
          placeholder="Search by name, email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '10px',
            width: '300px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      {/* Add Contact Form */}
      <div>
        <h3>Add New Contact:</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newContact.name}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newContact.email}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={newContact.phone}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={newContact.tags}
          onChange={(e) => setNewContact({ ...newContact, tags: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <button onClick={addContact}>Add Contact</button>
      </div>

      {/* Contacts Table */}
      <h3>All Contacts:</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact, index) => (
              <tr key={index}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.tags ? contact.tags.join(', ') : ''}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No contacts found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactManager;
