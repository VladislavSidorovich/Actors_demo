import React, { useState } from 'react';
import './ActorModal.css';

const ItemList = ({ items, onDelete, onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleDeleteClick = (itemId) => {
    setSelectedItemId(itemId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(selectedItemId);
    setIsModalOpen(false);
    setSelectedItemId(null);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setSelectedItemId(null);
  };

  return (
    <>
      <ul className="gallery-actor">
        {items.map(item => (
          <li key={item.id} className='gallery-item-actor'>
            <img src={item.mainImageUrl} alt={`${item.name} main`} />
            <div className='list-button'>
              <button onClick={() => onEdit(item)}>Изменить</button>
              <button onClick={() => handleDeleteClick(item.id)}>Удалить</button>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="delite-modal">
          <div className="delite-modal-content">
            <p>Вы действительно хотите удалить элемент?</p>
            <div className='delite-modal-button'>
              <button onClick={handleConfirmDelete}>Да</button>
              <button onClick={handleCancelDelete}>Нет</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemList;