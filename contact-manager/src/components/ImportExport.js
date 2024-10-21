import React, { useState } from 'react';
import './ImportExport.css'; 

const ImportExport = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState('');

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const vcfData = event.target.result;
        const parsedContacts = parseVcf(vcfData);
        setContacts(parsedContacts);
        setError('');
      };
      reader.onerror = () => {
        setError('Error reading file');
      };
      reader.readAsText(file);
    }
  };

  const parseVcf = (data) => {
    const lines = data.split('\n');
    const contactsArray = [];

    let currentContact = {};
    lines.forEach((line) => {
      if (line.startsWith('BEGIN:VCARD')) {
        currentContact = {};
      } else if (line.startsWith('FN:')) {
        currentContact.name = line.substring(3) || "None"; // Default to "None" if empty
      } else if (line.startsWith('TEL:')) {
        currentContact.phone = line.substring(4) || "None"; // Default to "None" if empty
      } else if (line.startsWith('EMAIL:')) {
        currentContact.email = line.substring(6) || "None"; // Default to "None" if empty
      } else if (line.startsWith('END:VCARD')) {
        contactsArray.push(currentContact);
      }
    });

    return contactsArray;
  };

  const handleEdit = (index, field, value) => {
    const updatedContacts = [...contacts];
    updatedContacts[index][field] = value || "None"; // Default to "None" if empty
    setContacts(updatedContacts);
  };

  const exportContacts = () => {
    if (contacts.length === 0) {
      setError('No contacts to export');
      return;
    }

    const vCardData = contacts.map(contact => {
      return `BEGIN:VCARD\nFN:${contact.name}\nTEL:${contact.phone}\nEMAIL:${contact.email}\nEND:VCARD`;
    }).join('\n');

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contacts.vcf';
    a.click();
    URL.revokeObjectURL(url); // Clean up URL object
  };

  return (
    <div className="import-export">
      <h2>Import/Export Contacts</h2>
      <input type="file" accept=".vcf" onChange={handleImport} />
      {error && <p className="import-export error-message">{error}</p>}
      
      {contacts.length > 0 && (
        <div>
          <h3>Imported Contacts</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={contact.name}
                      onChange={(e) => handleEdit(index, 'name', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={contact.phone}
                      onChange={(e) => handleEdit(index, 'phone', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={contact.email}
                      onChange={(e) => handleEdit(index, 'email', e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={() => {
                      const updatedContacts = contacts.filter((_, i) => i !== index);
                      setContacts(updatedContacts);
                    }}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={exportContacts} className="import-export export-button">Export to VCF</button>
        </div>
      )}
    </div>
  );
};

export default ImportExport;
