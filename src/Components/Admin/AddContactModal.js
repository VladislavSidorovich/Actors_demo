import React, { useState } from 'react';
import { storage } from '../../firebaseConfig'; // убедитесь, что у вас настроен Firebase Storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './ContactModal.css';

const AddContactModal = ({ onSave, onClose }) => {
  const [contact, setContact] = useState({
    name: '',
    role: '',
    email: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleFileChange = (e) => {
    setContact({ ...contact, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contact.image) {
      const imageRef = ref(storage, `images/${contact.image.name}`);
      await uploadBytes(imageRef, contact.image);
      const imageUrl = await getDownloadURL(imageRef);
      onSave({ ...contact, image: imageUrl });
    } else {
      onSave(contact);
    }
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content-contact">
        <h2 className="modal-content-h2">Добавить контакт</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Имя" value={contact.name} onChange={handleChange} required />
          <input name="role" placeholder="Роль" value={contact.role} onChange={handleChange} required />
          <input name="email" placeholder="Эл. почта" value={contact.email} onChange={handleChange} />
          <input type="file" onChange={handleFileChange} />
          <div className="contact-modal-button">
            <button type="submit">Сохранить</button>
            <button type="button" onClick={onClose}>Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContactModal;