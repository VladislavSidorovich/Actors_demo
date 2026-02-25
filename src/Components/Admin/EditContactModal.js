import React, { useState } from 'react';
import './ContactModal.css';

const EditModal = ({ item, onSave, onClose }) => {
  const [contact, setContact] = useState(item);
  const [imagePreview, setImagePreview] = useState(contact.image);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setContact({ ...contact, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(contact);
  };

  return (
    <div className="modal">
      <div className="modal-content-contact">
        <h2 className="modal-content-h2">Изменить контакт</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" value={contact.name} onChange={handleChange} required />
          <input name="role" placeholder="Role" value={contact.role} onChange={handleChange} required />
          <input name="email" placeholder="Email" value={contact.email} onChange={handleChange} />
          <input type="file" onChange={handleImageChange} />
          <div className="contact-modal-button">
            <button type="submit">Сохранить</button>
            <button type="button" onClick={onClose}>Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;