import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import ItemList from './ItemList';
import ItemForm from './ItemForm';
import EditModal from './EditModal';
import AddContactModal from './AddContactModal';
import ItemListContacts from './ItemListcontacts';
import EditContactModal from './EditContactModal';
import './Admin.css';

const Admin = () => {
  const [items, setItems] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [activeSection, setActiveSection] = useState('actors');

  useEffect(() => {
    const fetchActors = async () => {
      const querySnapshot = await getDocs(collection(db, "actors"));
      const itemsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(itemsList);
    };

    const fetchContacts = async () => {
      const querySnapshot = await getDocs(collection(db, "contacts"));
      const contactsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setContacts(contactsList);
    };

    if (activeSection === 'actors') {
      fetchActors();
    } else if (activeSection === 'contacts') {
      fetchContacts();
    }
  }, [activeSection]);

  const addItem = async (itemData, collectionName) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), itemData);
      if (collectionName === 'actors') {
        setItems([...items, { id: docRef.id, ...itemData }]);
      } else {
        setContacts([...contacts, { id: docRef.id, ...itemData }]);
      }
    } catch (error) {
      console.error(`Ошибка добавления документа в ${collectionName}: `, error);
    }
  };

  const deleteItem = async (id, collectionName) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      if (collectionName === 'actors') {
        setItems(items.filter(item => item.id !== id));
      } else {
        setContacts(contacts.filter(contact => contact.id !== id));
      }
    } catch (error) {
      console.error(`Ошибка удаления документа из ${collectionName}: `, error);
    }
  };

  const saveChanges = async (updatedItem, collectionName) => {
    try {
      const docRef = doc(db, collectionName, updatedItem.id);
      await updateDoc(docRef, updatedItem);
      if (collectionName === 'actors') {
        setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
      } else {
        setContacts(contacts.map(contact => contact.id === updatedItem.id ? updatedItem : contact));
      }
      closeEditModal();
    } catch (error) {
      console.error(`Ошибка обновления документа в ${collectionName}: `, error);
    }
  };

  const openEditModal = (item) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  return (
    <div className='admin'>
      <h2>Панель администратора</h2>
      <div className='admin-nav'>
        <button onClick={() => setActiveSection('actors')}>Актёры</button>
        <button onClick={() => setActiveSection('contacts')}>Контакты</button>
      </div>
      
      {activeSection === 'actors' && (
        <div className='actors-container'>
          <button onClick={() => setIsModalOpen(true)}>Добавить актёра</button>
          <div className='actors-container-content'>
            <ItemList items={items} onDelete={(id) => deleteItem(id, 'actors')} onEdit={openEditModal} />
            {isModalOpen && !currentItem && (
              <ItemForm onSave={(item) => addItem(item, 'actors')} onClose={closeEditModal} />
            )}
            {isModalOpen && currentItem && (
              <EditModal item={currentItem} onSave={(item) => saveChanges(item, 'actors')} onClose={closeEditModal} />
            )}
          </div>
        </div>
      )}

      {activeSection === 'contacts' && (
        <div>
          <div className='actors-container'>
            <button onClick={() => setIsModalOpen(true)}>Добавить контакт</button>
            <div className='actors-container-content'>
              <ItemListContacts items={contacts} onDelete={(id) => deleteItem(id, 'contacts')} onEdit={openEditModal} />
              {isModalOpen && !currentItem && (
                <AddContactModal onSave={(item) => addItem(item, 'contacts')} onClose={closeEditModal} />
              )}
              {isModalOpen && currentItem && (
                <EditContactModal item={currentItem} onSave={(item) => saveChanges(item, 'contacts')} onClose={closeEditModal}/>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;