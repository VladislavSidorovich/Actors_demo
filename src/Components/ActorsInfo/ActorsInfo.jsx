import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import Header from '../Header/Header';
import './ActorsInfo.css';
import instagram from '../images/instagram.svg';
import telegram from '../images/telegram.svg';
import vk from '../images/vk.svg';
import info_iacon_one from '../images/info_iacon_one.svg';
import info_iacon_two from '../images/info_iacon_two.svg';
import info_iacon_three from '../images/info_iacon_three.svg';
import info_iacon_fore from '../images/info_iacon_fore.svg';
import arrows_botton_mobile from '../images/arrows_botton_mobile.png';

const ActorsInfo = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFilms, setShowFilms] = useState(false);
  const [showRole, setShowRole] = useState(false);
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
            <img className='actor-info_absolute_imagas' src={info_iacon_one} alt="" />
            <h2>{actor.name}</h2>
            <h3>Возраст : {actor.birthDate}</h3>
            <p>Рост - {actor.height} см</p>
            <p>цвет волос - {actor.hairColor}</p>
            <p>цвет глаз - {actor.eyeColor}</p>
            <h4>Образование :</h4>
            {actor.university &&
              actor.university.split(',').map((universityPart, index) => (
                <h4 key={index}> {universityPart.trim()}</h4>
              ))}
          </div>
          <div className="social">
            <div className="social-icons">
              {actor.instagram && (
                <>
                  <a href={actor.instagram}><img src={instagram} alt="Instagram" /></a>
                </>
              )}
              {actor.telegram && (
                <>
                  <a href={actor.telegram}><img src={telegram} alt="Instagram" /></a>
                </>
              )}
              {actor.vk && (
                <>
                  <a href={actor.vk}><img src={vk} alt="Instagram" /></a>
                </>
              )}
            </div>
            <div className="social-number">
              <p>Агент: {actor.agent}</p>
              <p>{actor.agentPhone}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="actor-details">
        <div className="actor-info-details disktop">
          <div className='actor-info-film'>
            {actor.films && actor.films.length > 0 && (
              <>
                <h2>фильмография</h2>
                {actor.films.map((film, index) => (
                  <div key={index}>
                    <h3>{film.year}</h3>
                    <p>{film.info}</p>
                  </div>
                ))}
              </>
            )}
            {actor.roles && actor.roles[0].info !== "" && (
              <>
                <h2 className='role'>Роли в театре</h2>
                {actor.roles.map((role, index) => (
                  <div key={index}>
                    <h3>{role.year}</h3>
                    <p>{role.info}</p>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className='actor-info-nav'>
            <img className='actor-info-nav_absolute_imagas' src={info_iacon_two} alt="" />
            <h2>навыки</h2>
            <h3>умения</h3>
            {actor.skills && actor.skills.map((skill, index) => (
              <p key={index}>{skill.name}</p>
            ))}
            <h3>языки</h3>
            {actor.languages && actor.languages.map((language, index) => (
              <p key={index}>{language.name}</p>
            ))}
          </div>
        </div>
        <div className="actor-info-details mobile">
          <div className="actor-info-film">
            <div className="toggle-header" onClick={() => setShowFilms(!showFilms)}>
              <h2>фильмография</h2>
              <span className={`arrow ${showFilms ? 'open' : ''}`}><img src={arrows_botton_mobile} alt="" /> </span>
            </div>
            {showFilms && actor.films && actor.films.map((film, index) => (
              <div key={index}>
                <h3>{film.year}</h3>
                <p>{film.info}</p>
              </div>
            ))}
            <div className="toggle-header role" onClick={() => setShowRole(!showRole)}>
              <h2 >Роли в театре</h2>
              <span className={`arrow ${showRole ? 'open' : ''}`}><img src={arrows_botton_mobile} alt="" /> </span>
            </div>
            {showRole && actor.roles && actor.roles.map((role, index) => (
              <div key={index}>
                <h3>{role.year}</h3>
                <p>{role.info}</p>
              </div>
            ))}
          </div>

          <div className="actor-info-nav">
            <div className="toggle-header" onClick={() => setShowSkills(!showSkills)}>
              <h2>навыки</h2>
              <span className={`arrow ${showSkills ? 'open' : ''}`}><img src={arrows_botton_mobile} alt="" /> </span>
            </div>
            {showSkills && (
              <div className="actor-info-nav">
                <h3>умения</h3>
                {actor.skills.map((skill, index) => (
                  <p key={index}>{skill.name}</p>
                ))}
                <h3>языки</h3>
                {actor.languages.map((language, index) => (
                  <p key={index}>{language.name}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="gallery_info">
        <img className='gallery_absolute_imagas' src={info_iacon_three} alt="" />
        <h2>ГАЛЕРЕЯ</h2>
        <div className="gallery-images_info">
          <img src={actor.mainImageUrl} alt="Actor" />
          {actor.additionalImageUrls && actor.additionalImageUrls.map((url, index) => (
            <img key={index} src={url} alt={`Gallery ${index + 1}`} />
          ))}
        </div>
      </div>
      {actor.videoLink && (
        <div className="video">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${actor.videoLink}`}
            title="Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <h2>ВИДЕОВИЗИТКА</h2>
          <img className='video_absolute_imagas' src={info_iacon_fore} alt="" />
        </div>
      )}
    </>
  );
};

export default ActorsInfo;