import React from 'react';
import './About.css'; 
import Header from '../Header/Header'
import instagram from '../images/instagram.svg';
import telegram from '../images/telegram.svg';
import vk from '../images/vk.svg';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const About = () => {

  const MAPBOX_TOKEN = 'pk.eyJ1IjoidmxhZGlzbGF2c2lkIiwiYSI6ImNtMTg3enBiMjB3b3oyaXF6dGV5bXVtdzcifQ.HFXUF85RtWYTbbiC42vwvw'; // Замените на ваш токен

  return (
    <>
    <Header/>
    <div className="about-page">
    <h2>TWOЙ AGENCY</h2>
      <div className="about-content">
        <div className='about-image'>
          <Map
            initialViewState={{
              longitude: 37.515614,
              latitude: 55.801339,
              zoom: 15
            }}
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/vladislavsid/cm19f91mn028r01qog86a2c73"
            mapboxAccessToken={MAPBOX_TOKEN}
          >
            <Marker longitude={37.515614} latitude={55.801339}  />
          </Map>
        </div>
        <div className="about-details">
          <h3>АДРЕС</h3>
          <p>Г. Москва, ул. Новопесчаная, 6к2, помещ. 2П</p>
          <h3>МЫ В СОЦСЕТЯХ</h3>
          <div className="social-icons">
            <a href="https://www.instagram.com/twoi.prod?igsh=MWFoYXNjMGhseGw4"><img src={instagram} alt="Instagram" /></a>
            <a href="https://t.me/twoi_prod"><img src={telegram} alt="Instagram" /></a>
            <a href="https://vk.com/twoyagency"><img src={vk} alt="Instagram" /></a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default About;