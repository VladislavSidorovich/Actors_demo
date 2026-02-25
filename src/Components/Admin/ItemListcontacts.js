import React from 'react';
import './ActorModal.css'; 

const ItemListContacts = ({ items, onDelete, onEdit }) => {
  return (
    <ul className="gallery-actor">
    {items.map(item => (
      <li key={item.id} className='gallery-item-actor'>
        <img src={item.image} alt={`${item.name} main`} />
        <div className='list-button'>
          <button onClick={() => onEdit(item)}>Изменить</button>
          <button onClick={() => onDelete(item.id)}>Удалить</button>
        </div>
      </li>
    ))}
  </ul>
  );
};

export default ItemListContacts;