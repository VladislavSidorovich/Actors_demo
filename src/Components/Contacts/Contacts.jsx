import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Убедитесь, что ваш конфиг Firebase импортирован правильно
import './Contacts.css';
import Header from '../Header/Header';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const querySnapshot = await getDocs(collection(db, "contacts"));
      const contactsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setContacts(contactsList);
    };

    fetchContacts();
  }, []);

  return (
    <>
      <Header />
      <div className="contacts-page">
        <h2>КОНТАКТЫ</h2>
        <div className="contacts-grid">
          {contacts.map((contact) => (
            <div key={contact.id} className="contact-card">
              <div className='images_conteiner'>
                <img src={contact.image} alt={contact.name} />
              </div>
              <div className="contact-info">
                <h3>{contact.name}</h3>
                <p>{contact.role}</p>
                {contact.email && <p>{contact.email}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Contacts;