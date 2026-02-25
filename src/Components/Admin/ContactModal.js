import React, { useState, useEffect } from 'react';
import './ActorModal.css'; // Add styles for your modal

const ContactModal = ({ isOpen, onClose, onSave, currentContact }) => {
  const [contact, setContact] = useState({ name: '', role: '', email: '', image: '' });

  useEffect(() => {
    if (currentContact) {
      setContact(currentContact);
    }
  }, [currentContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(contact);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{currentContact ? 'Edit Contact' : 'Add Contact'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={contact.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="text"
            name="role"
            value={contact.role}
            onChange={handleChange}
            placeholder="Role"
            required
          />
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="image"
            value={contact.image}
            onChange={handleChange}
            placeholder="Image URL"
          />
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;