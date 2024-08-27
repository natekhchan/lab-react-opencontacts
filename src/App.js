import React, { useState } from 'react';
import contacts from './contacts.json'; // Ensure this path is correct
import './App.css'; // Ensure this path is correct

const App = () => {
  // Initial state for the first 5 contacts
  const [contactsList, setContactsList] = useState(contacts.slice(0, 5));
  
  // State for all remaining contacts
  const [remainingContacts, setRemainingContacts] = useState(contacts.slice(5));

  const addRandomContact = () => {
    if (remainingContacts.length === 0) return;

    const randomIndex = Math.floor(Math.random() * remainingContacts.length);
    const randomContact = remainingContacts[randomIndex];

    setContactsList((prevContacts) => [...prevContacts, randomContact]);
    setRemainingContacts((prevContacts) =>
      prevContacts.filter((_, index) => index !== randomIndex)
    );
  };

  const removeContact = (id) => {
    setContactsList((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  const sortByName = () => {
    setContactsList((prevContacts) =>
      [...prevContacts].sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  const sortByPopularity = () => {
    setContactsList((prevContacts) =>
      [...prevContacts].sort((a, b) => b.popularity - a.popularity)
    );
  };

  return (
    <div>
      <div className="title">OpenContacts</div>
      <div className="button-container">
        <button onClick={addRandomContact}>Add Random Contact</button>
        <button onClick={sortByName}>Sort by Name</button>
        <button onClick={sortByPopularity}>Sort by Popularity</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contactsList.map((contact) => (
            <tr key={contact.id}>
              <td><img src={contact.pictureUrl} alt={contact.name} width="100" /></td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td>{contact.wonOscar ? '🏆' : ''}</td>
              <td>{contact.wonEmmy ? '🏆' : ''}</td>
              <td>
                <button className="deleteButton" onClick={() => removeContact(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;