import React from 'react';
import './Contacts.css';
import Header from '../Header/Header'
import d_marcina from '../images/DariaMarkina/photo_1.webp';
import director from '../images/director.webp';
import agent from '../images/agent.webp';
import producer from '../images/producer.jpg';

const Contacts = () => {
  
  const contacts = [
    /* {
      name: 'Дарья Маркина',
      role: 'Сооснователь, продюсер, актриса',
      email: 'nfo@twoyagency.ru',
      image: d_marcina,
    },
   {
      name: 'Араз Зейналов',
      role: 'Директор Агентства',
      image: 'placeholder.png',
    },*/
    {
      name: 'Маргарита Кучер',
      role: 'Кастинг-директор, агент',
      email: 'director@twoyagency.ru',
      image: director,
    },
     {
      name: 'Дарья Юшковская',
      role: 'Агент, кастинг-директор',
      image: agent,
    },
    {
      name: 'Алика Соколова',
      role: 'Продюсер, агент, кастинг-директор',
      image: producer,
    },
  /*  {
      name: 'Снежана Шевченко',
      role: 'Художник по Гриму, Визажист',
      image: 'placeholder.png',
    },*/
  ];

  return (
    <>
        <Header/>
        <div className="contacts-page">
            <h2>КОНТАКТЫ</h2>
            <div className="contacts-grid">
                {contacts.map((contact, index) => (
                <div key={index} className="contact-card">
                    <div className='images_conteiner'><img src={contact.image} alt={contact.name}/></div>
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