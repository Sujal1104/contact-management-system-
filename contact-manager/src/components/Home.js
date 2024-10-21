import React, { useState } from 'react';
import './Home.css';

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tags, setTags] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const namePattern = /^[A-Za-z\s]+$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9]+$/;

  const addContact = (e) => {
    e.preventDefault();

    if (!namePattern.test(name)) {
      alert("Name can only contain alphabetic characters and spaces.");
      return;
    }

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!phonePattern.test(phone)) {
      alert("Phone number can only contain numbers.");
      return;
    }

    const newContact = { name, email, phone, tags: tags.split(',').map(tag => tag.trim()) };
    setContacts([...contacts, newContact]);
    resetForm();
  };

  const deleteContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  };

  const updateContact = (e) => {
    e.preventDefault();

    if (!namePattern.test(name)) {
      alert("Name can only contain alphabetic characters and spaces.");
      return;
    }

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!phonePattern.test(phone)) {
      alert("Phone number can only contain numbers.");
      return;
    }

    const updatedContact = { name, email, phone, tags: tags.split(',').map(tag => tag.trim()) };
    const updatedContacts = [...contacts];
    updatedContacts[editIndex] = updatedContact;
    setContacts(updatedContacts);
    setEditIndex(null);
    resetForm();
  };

  const editContact = (index) => {
    const contact = contacts[index];
    setName(contact.name);
    setEmail(contact.email);
    setPhone(contact.phone);
    setTags(contact.tags.join(', '));
    setEditIndex(index);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setTags('');
  };

  const mergeContacts = () => {
    const mergedContacts = {};
    contacts.forEach(contact => {
      const key = `${contact.name.toLowerCase()}|${contact.email.toLowerCase()}|${contact.phone}`;
      if (mergedContacts[key]) {
        mergedContacts[key].tags = Array.from(new Set([...mergedContacts[key].tags, ...contact.tags]));
      } else {
        mergedContacts[key] = { ...contact };
      }
    });
    setContacts(Object.values(mergedContacts));
    alert('Duplicate contacts merged successfully!');
  };

  const filteredContacts = contacts.filter(contact => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      contact.name.toLowerCase().includes(lowerCaseQuery) ||
      contact.email.toLowerCase().includes(lowerCaseQuery) ||
      contact.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
    );
  });

  // Group contacts by tags
  const groupByTags = (contacts) => {
    return contacts.reduce((acc, contact) => {
      contact.tags.forEach(tag => {
        const lowerCaseTag = tag.toLowerCase();
        if (!acc[lowerCaseTag]) {
          acc[lowerCaseTag] = [];
        }
        acc[lowerCaseTag].push(contact);
      });
      return acc;
    }, {});
  };

  const groupedContacts = groupByTags(filteredContacts);

  return (
    <div className="home-container">
      <h1>Contact Management</h1>

      {/* Search Bar and Merge Button */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name, email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={mergeContacts}>Merge Duplicate Contacts</button>
      </div>

      {/* Form for Adding/Editing Contact */}
      <form onSubmit={editIndex !== null ? updateContact : addContact}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button type="submit">{editIndex !== null ? 'Update' : 'Add'} Contact</button>
      </form>

      {/* Display Grouped Contacts */}
      {Object.keys(groupedContacts).length > 0 ? (
        Object.keys(groupedContacts).map(tag => (
          <div key={tag} className="group">
            <h2>Tag: {tag}</h2>
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Tags</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {groupedContacts[tag].map((contact, index) => (
                  <tr key={index}>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>{contact.tags.join(', ')}</td>
                    <td className="contact-actions">
                      <button className="edit-btn" onClick={() => editContact(contacts.indexOf(contact))}>Edit</button>
                      <button className="delete-btn" onClick={() => deleteContact(contacts.indexOf(contact))}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p>No contacts available. Add some!</p>
      )}
    </div>
  );
};

export default Home;
