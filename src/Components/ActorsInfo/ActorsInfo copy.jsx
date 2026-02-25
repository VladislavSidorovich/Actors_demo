import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import './ActorsInfo.css';
import instagram from '../images/instagram.svg';
import telegram from '../images/telegram.svg';
import vk from '../images/vk.svg';
import Header from '../Header/Header';

const ActorsInfo = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFilms, setShowFilms] = useState(false);
  const [showSkills, setShowSkills] = useState(false);

  useEffect(() => {
    const fetchActorData = async () => {
      try {
        const docRef = doc(db, "actors", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setActor(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActorData();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!actor) return <p>Actor information not available.</p>;

  return (
    <>
      <Header />
      <div className="actors-info-page">
        <div className="actors-info-page-content">
          <div className="actor-photo">
            <img src={actor.mainImageUrl} alt="Actor" />
          </div>
          <div className="actor-info">
            <img className='actor-info_absolute_imagas' src={actor.infoImage} alt="" />
            <h2>{actor.name}</h2>
            <h3>дата рождения: {actor.birthDate}</h3>
            <p>Рост - {actor.height} см</p>
            <p>цвет волос - {actor.hairColor}</p>
            <p>цвет глаз - {actor.eyeColor}</p>
            <h4>Закончил {actor.university}</h4>
          </div>
          <div className="social">
            <div className="social-icons">
              <img src={instagram} alt="Instagram" />
              <img src={telegram} alt="Telegram" />
              <img src={vk} alt="VK" />
            </div>
            <div className="social-number">
              <p>Агент: {actor.agent}</p>
              <p>{actor.agentPhone}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="actor-details">
        <div className="actor-info-details">
          <div className="toggle-section">
            <div className="toggle-header" onClick={() => setShowFilms(!showFilms)}>
              <h2>фильмография</h2>
              <span className={`arrow ${showFilms ? 'open' : ''}`}>▶</span>
            </div>
            {showFilms && (
              <div className="toggle-content">
                {actor.films.map((film, index) => (
                  <div key={index}>
                    <h3>{film.year}</h3>
                    <p>{film.info}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="toggle-section">
            <div className="toggle-header" onClick={() => setShowSkills(!showSkills)}>
              <h2>навыки</h2>
              <span className={`arrow ${showSkills ? 'open' : ''}`}>▶</span>
            </div>
            {showSkills && (
              <div className="toggle-content">
                <h3>умения</h3>
                {actor.skills.map((skill, index) => (
                  <p key={index}>{skill}</p>
                ))}
                <h3>языки</h3>
                {actor.languages.map((language, index) => (
                  <p key={index}>{language}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="gallery_info">
        <img className='gallery_absolute_imagas' src={actor.galleryImage} alt="" />
        <h2>ГАЛЕРЕЯ</h2>
        <div className="gallery-images_info">
          {actor.additionalImageUrls.map((url, index) => (
            <img key={index} src={url} alt={`Gallery ${index + 1}`} />
          ))}
        </div>
      </div>
      <div className="video">
        <img src={actor.videoThumbnail} alt="Video Thumbnail" />
        <h2>ВИДЕОВИЗИТКА</h2>
        <img className='video_absolute_imagas' src={actor.videoImage} alt="" />
      </div>
    </>
  );
};

export default ActorsInfo;