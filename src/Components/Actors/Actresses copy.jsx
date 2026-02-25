import React from 'react';
import './Actors.css'; 
import Header from '../Header/Header'
import d_marcina from '../images/DariaMarkina/photo_1.jpg';
import arrows_botton from '../images/arrows_botton.svg';
import arrows_top from '../images/arrows_top.svg';
import duck from '../images/duck.svg';
import { Link } from 'react-router-dom';
import ashotEloyan from '../images/AshotEloyan.webp';
import igorSidorov from '../images/IgorSidorov.webp';
import kirillSolyanik from '../images/KirillSolyanik.webp';
import tanyaRychkova from '../images/TanyaRychkova/photo_1.webp';
import olgaBorisevich from '../images/OlgaBorisevich/photo_1.webp';
import alexanderNikolayevichMakhrov from '../images/AlexanderNikolayevichMakhrov/photo_1.webp';
import alsinaDenisheva from '../images/AlsinaDenisheva/photo_1.webp';
import ekaterinaVoskresenskaya from '../images/EkaterinaVoskresenskaya/photo_1.webp';
import ekaterinaChermnykh from '../images/EkaterinaChermnykh/photo_1.webp';
import anatolyBukin from '../images/AnatolyBukin/photo_1.webp';
import dariaVeselova from '../images/DariaVeselova/photo_1.webp';
import nataliaYapryntseva from '../images/NataliaYapryntseva/photo_1.webp';
import alyonaOzarovskaya from '../images/AlyonaOzarovskaya/photo_1.webp';

const Actors = () => {
  return (
    <>
    <Header/>
    <div className="actors-page">
      <aside className="sidebar">
        <input type="text" placeholder="Поиск" className="search-input" />
        <nav className="nav-menu">
          <ul>
            <Link to="/actresses"><li>АКТРИСЫ</li></Link>
            <Link to="/actrors"><li>АКТЕРЫ</li></Link>
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
                  20
                  <div className='arrows_content'>
                    <img src={arrows_top} alt="arrows_top" />
                    <img src={arrows_botton} alt="arrows_botton" />
                  </div>
                </div>
                <div className='arrows'>
                  70
                  <div className='arrows_content'>
                    <img src={arrows_top} alt="arrows_top" />
                    <img src={arrows_botton} alt="arrows_botton" />
                </div>
              </div>
            </div>
            </div>
          <div className="filter-item">
            РОСТ
            <div className='filter-item_content'>
              <div className='arrows'>
                  150
                  <div className='arrows_content'>
                    <img src={arrows_top} alt="arrows_top" />
                    <img src={arrows_botton} alt="arrows_botton" />
                  </div>
                </div>
                <div className='arrows'>
                  200
                  <div className='arrows_content'>
                    <img src={arrows_top} alt="arrows_top" />
                    <img src={arrows_botton} alt="arrows_botton" />
                </div>
              </div>
            </div>
          </div>
          <div className="filter-item">
            ДОП. НАВЫКИ <br />
            <div className='filter-item_content'>
              <div className='arrows'>
                  НЕ ВЫБРАНО
                  <div className='arrows_content_bottom'>
                    <img src={arrows_botton} alt="arrows_botton" />
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div className="gallery">
          <Link to="/dariaMarkina"><div className="gallery-item"><img src={d_marcina} alt="Actor 1" /></div></Link>
          <Link to="/tanyaRychkova"><div className="gallery-item"><img src={tanyaRychkova} alt="Actor 1" /></div></Link>
          <Link to="/olgaBorisevich"><div className="gallery-item"><img src={olgaBorisevich} alt="Actor 1" /></div></Link>
          <Link to="/alsinaDenisheva"><div className="gallery-item"><img src={alsinaDenisheva} alt="Actor 1" /></div></Link>
          <Link to="/ekaterinaVoskresenskaya"><div className="gallery-item"><img src={ekaterinaVoskresenskaya} alt="Actor 1" /></div></Link>
          <Link to="/ekaterinaChermnykh"><div className="gallery-item"><img src={ekaterinaChermnykh} alt="Actor 1" /></div></Link>
          <Link to="/dariaVeselova"><div className="gallery-item"><img src={dariaVeselova} alt="Actor 1" /></div></Link>
          <Link to="/nataliaYapryntseva"><div className="gallery-item"><img src={nataliaYapryntseva} alt="Actor 1" /></div></Link>
          <Link to="/alyonaOzarovskaya"><div className="gallery-item"><img src={alyonaOzarovskaya} alt="Actor 1" /></div></Link>
        </div>
      </main>
    </div>
    </>
  );
};

export default Actors;