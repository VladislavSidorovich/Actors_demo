import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import ItemList from './ItemList';
import ItemForm from './ItemForm';
import EditModal from './EditModal';
import './Admin.css';

const Admin = () => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "actors"));
      const itemsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(itemsList);
    };

    fetchData();
  }, []);

  const addItem = async (itemData) => {
    try {
      await addDoc(collection(db, "actors"), itemData);
      setItems([...items, itemData]);
    } catch (error) {
      console.error("Ошибка добавления документа: ", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, "actors", id));
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error("Ошибка удаления документа: ", error);
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

  const saveChanges = async (updatedItem) => {
    try {
      const docRef = doc(db, "actors", updatedItem.id);
      await updateDoc(docRef, updatedItem);
      const updatedItems = items.map(item => 
        item.id === updatedItem.id ? updatedItem : item
      );
      setItems(updatedItems);
      closeEditModal();
    } catch (error) {
      console.error("Ошибка обновления документа: ", error);
    }
  };

  return (
    <div className='admin'>
      <h1>Панель администратора</h1>
      <button onClick={() => setIsModalOpen(true)}>Добавить элемент</button>
      <ItemList items={items} onDelete={deleteItem} onEdit={openEditModal} />
      {isModalOpen && !currentItem && (
        <ItemForm onSave={addItem} onClose={() => setIsModalOpen(false)} />
      )}
      {isModalOpen && currentItem && (
        <EditModal item={currentItem} onSave={saveChanges} onClose={closeEditModal} />
      )}
    </div>
  );
};

export default Admin;