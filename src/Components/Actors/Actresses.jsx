import React, { useState, useEffect } from 'react';
import './Actors.css'; 
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import duck from '../images/duck.svg';
import arrows_botton from '../images/arrows_botton.svg';
import arrows_top from '../images/arrows_top.svg';

const Actors = () => {
  const [actors, setActors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ageRange, setAgeRange] = useState({ min: 20, max: 70 });
  const [heightRange, setHeightRange] = useState({ min: 150, max: 200 });

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "actors"));
        const actorsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setActors(actorsList);
      } catch (error) {
        console.error("Error fetching actors: ", error);
      }
    };

    fetchActors();
  }, []);

  const filteredActors = actors.filter(actor => {
    const matchesSearch = actor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAge = actor.birthDate >= ageRange.min && actor.birthDate <= ageRange.max;
    const matchesHeight = actor.height >= heightRange.min && actor.height <= heightRange.max;
    const matchesGender = actor.gender === 'female';

    return matchesSearch && matchesAge && matchesHeight && matchesGender;
  });

  const handleAgeChange = (type, direction) => {
    setAgeRange(prev => ({
      ...prev,
      [type]: direction === 'up' ? prev[type] + 1 : prev[type] - 1
    }));
  };

  const handleHeightChange = (type, direction) => {
    setHeightRange(prev => ({
      ...prev,
      [type]: direction === 'up' ? prev[type] + 1 : prev[type] - 1
    }));
  };

 // console.log(actors);
  
  return (
    <>
      <Header/>
      <div className="actors-page">
        <aside className="sidebar">
          <input 
            type="text" 
            placeholder="Поиск" 
            className="search-input" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <nav className="nav-menu">
            <ul>
              <Link to="/actresses"><li>АКТРИСЫ</li></Link>
              <Link to="/actors"><li>АКТЕРЫ</li></Link>
              <Link to="/contacts"><li>РЕЖИССЕРЫ</li></Link>
              <Link to="/contacts"><li>ПРОДЮСЕРЫ</li></Link>
              <Link to="/contacts"><li>КАСТИНГ-ДИРЕКТОРА</li></Link>
            </ul>
          </nav>
          <div className="duck-image">
            <img src={duck} alt="Duck" /> 
          </div>
        </aside>
        <main className="content">
          <div className="filters">
            <div className="filter-item">
              ВОЗРАСТ 
              <div className='filter-item_content'>
                <div className='arrows'>
                  {ageRange.min}
                  <div className='arrows_content'>
                    <img src={arrows_top} alt="arrows_top" onClick={() => handleAgeChange('min', 'up')} />
                    <img src={arrows_botton} alt="arrows_botton" onClick={() => handleAgeChange('min', 'down')} />
                  </div>
                </div>
                <div className='arrows'>
                  {ageRange.max}
                  <div className='arrows_content'>
                    <img src={arrows_top} alt="arrows_top" onClick={() => handleAgeChange('max', 'up')} />
                    <img src={arrows_botton} alt="arrows_botton" onClick={() => handleAgeChange('max', 'down')} />
                  </div>
                </div>
              </div>
            </div>
            <div className="filter-item">
              РОСТ
              <div className='filter-item_content'>
                <div className='arrows'>
                  {heightRange.min}
                  <div className='arrows_content'>
                    <img src={arrows_top} alt="arrows_top" onClick={() => handleHeightChange('min', 'up')} />
                    <img src={arrows_botton} alt="arrows_botton" onClick={() => handleHeightChange('min', 'down')} />
                  </div>
                </div>
                <div className='arrows'>
                  {heightRange.max}
                  <div className='arrows_content'>
                    <img src={arrows_top} alt="arrows_top" onClick={() => handleHeightChange('max', 'up')} />
                    <img src={arrows_botton} alt="arrows_botton" onClick={() => handleHeightChange('max', 'down')} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="gallery">
            {filteredActors.map(actor => (
              <Link 
                to={`/${actor.id}`} 
                key={actor.id}
              >
                <div className="gallery-item">
                  <img src={actor.mainImageUrl} alt={actor.name} />
                  <div className="overlay">
                    <span className="actor-name">{actor.name}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default Actors;