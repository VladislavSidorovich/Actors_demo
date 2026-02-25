import './App.css';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Actresses from './Components/Actors/Actresses';
import Actors from './Components/Actors/Actors';
import Contacts from './Components/Contacts/Contacts';
import ActorsInfo from './Components/ActorsInfo/ActorsInfo';

import Login from './Components/Login/Login';
import Admin from './Components/Admin/Admin';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function App() {

  const [isBlack, setIsBlack] = useState(false);

  useEffect(() => {
    // Рассчитываем время через неделю в миллисекундах
    const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
    const timer = setTimeout(() => {
      setIsBlack(true);
    }, oneWeekInMs);

    // Очистка таймера при размонтировании
    return () => clearTimeout(timer);
  }, []);

  if (isBlack) {
    return (
      <div style={{
        backgroundColor: 'black',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px'
      }}>
   
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'initial', minHeight: '100vh' }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/actors" element={<Actors />} />
          <Route path="/actresses" element={<Actresses />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/:id" element={<ActorsInfo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;