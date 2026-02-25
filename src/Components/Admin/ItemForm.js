import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebaseConfig';
import './ActorModal.css';

const ItemForm = ({ onSave, onClose }) => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [height, setHeight] = useState('');
  const [hairColor, setHairColor] = useState('');
  const [eyeColor, setEyeColor] = useState('');
  const [university, setUniversity] = useState('');
  const [agent, setAgent] = useState('');
  const [agentPhone, setAgentPhone] = useState('');
  const [gender, setGender] = useState('');
  const [instagram, setInstagram] = useState('');
  const [telegram, setTelegram] = useState('');
  const [vk, setVk] = useState('');
  const [videoLink, setVideoLink] = useState(''); // Single video link
  const [roles, setRoles] = useState([{ year: '', info: '' }]);
  const [skills, setSkills] = useState([{ name: '' }]);
  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState(new Array(5).fill(null));
  const [films, setFilms] = useState([{ year: '', info: '' }]);
  const [languages, setLanguages] = useState([{ name: '' }]);

  const handleMainImageChange = (e) => {
    if (e.target.files[0]) {
      setMainImage(e.target.files[0]);
    }
  };

  const handleAdditionalImagesChange = (e, index) => {
    const newImages = [...additionalImages];
    newImages[index] = e.target.files[0];
    setAdditionalImages(newImages);
  };

  const handleFilmChange = (index, field, value) => {
    const newFilms = films.map((film, i) => (
      i === index ? { ...film, [field]: value } : film
    ));
    setFilms(newFilms);
  };

  const addFilm = () => {
    setFilms([...films, { year: '', info: '' }]);
  };

  const handleRoleChange = (index, field, value) => {
    const newRoles = roles.map((role, i) => (
      i === index ? { ...role, [field]: value } : role
    ));
    setRoles(newRoles);
  };

  const addRole = () => {
    setRoles([...roles, { year: '', info: '' }]);
  };

  const handleSkillChange = (index, value) => {
    const newSkills = skills.map((skill, i) => (
      i === index ? { name: value } : skill
    ));
    setSkills(newSkills);
  };

  const addSkill = () => {
    setSkills([...skills, { name: '' }]);
  };

  const handleLanguagesChange = (index, value) => {
    const newLanguages = languages.map((language, i) => (
      i === index ? { name: value } : language
    ));
    setLanguages(newLanguages);
  };

  const addLanguages = () => {
    setLanguages([...languages, { name: '' }]);
  };

  const handleSave = async () => {
    try {
      const mainImageRef = ref(storage, `images/${name}_main`);
      await uploadBytes(mainImageRef, mainImage);
      const mainImageUrl = await getDownloadURL(mainImageRef);

      const additionalImageUrls = await Promise.all(additionalImages.map(async (image, index) => {
        const imageRef = ref(storage, `images/${name}_additional_${index}`);
        await uploadBytes(imageRef, image);
        return await getDownloadURL(imageRef);
      }));

      const trimmedVideoLink = videoLink.replace('https://youtu.be/', '');

      const newItem = {
        name,
        birthDate,
        height,
        hairColor,
        eyeColor,
        university,
        agent,
        agentPhone,
        gender,
        instagram,
        telegram,
        vk,
        mainImageUrl,
        additionalImageUrls,
        films,
        roles,
        skills,
        languages,
        videoLink: trimmedVideoLink
      };

      onSave(newItem);
      onClose();
    } catch (error) {
      console.error("Ошибка добавления документа: ", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <h2 className='add-new-item'>Добавить новый элемент</h2>
        <div className='input-conteiner'>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Имя"
          />
          <input
            type="number"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            placeholder="Дата рождения"
          />
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Рост"
          />
          <input
            type="text"
            value={hairColor}
            onChange={(e) => setHairColor(e.target.value)}
            placeholder="Цвет волос"
          />
          <input
            type="text"
            value={eyeColor}
            onChange={(e) => setEyeColor(e.target.value)}
            placeholder="Цвет глаз"
          />
          <input
            type="text"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            placeholder="Университет"
          />
          <input
            type="text"
            value={agent}
            onChange={(e) => setAgent(e.target.value)}
            placeholder="Агент"
          />
          <input
            type="text"
            value={agentPhone}
            onChange={(e) => setAgentPhone(e.target.value)}
            placeholder="Телефон агента"
          />
        </div>
        <div className='radio-conteiner'>
          <label>
            <input
              type="radio"
              value="male"
              checked={gender === 'male'}
              onChange={() => setGender('male')}
            />
            Мужчина
          </label>
          <label>
            <input
              type="radio"
              value="female"
              checked={gender === 'female'}
              onChange={() => setGender('female')}
            />
            Женщина
          </label>
        </div>
        <div className='input-conteiner'>
          <input
            type="text"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            placeholder="Instagram"
          />
          <input
            type="text"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            placeholder="Telegram"
          />
          <input
            type="text"
            value={vk}
            onChange={(e) => setVk(e.target.value)}
            placeholder="VK"
          />
        </div>
        <div className='main-img'>
          <p>Главное фото</p>
          <input
            type="file"
            onChange={handleMainImageChange}
            placeholder="Главное изображение"
          />
        </div>
        <div className='input-conteiner'>
          {[...Array(5)].map((_, index) => (
            <input
              key={index}
              type="file"
              onChange={(e) => handleAdditionalImagesChange(e, index)}
              placeholder={`Дополнительное изображение ${index + 1}`}
            />
          ))}
        </div>
        <h3>Фильмография</h3>
        {films.map((film, index) => (
          <div key={index} className='input-conteiner'>
            <input
              type="text"
              value={film.year}
              onChange={(e) => handleFilmChange(index, 'year', e.target.value)}
              placeholder="Год"
            />
            <input
              type="text"
              value={film.info}
              onChange={(e) => handleFilmChange(index, 'info', e.target.value)}
              placeholder="Информация о фильме"
            />
          </div>
        ))}
        <button onClick={addFilm}>Добавить фильм</button>
        
        <h3>Роли в театре</h3>
        {roles.map((role, index) => (
          <div key={index} className='input-conteiner'>
            <input
              type="text"
              value={role.year}
              onChange={(e) => handleRoleChange(index, 'year', e.target.value)}
              placeholder="Год"
            />
            <input
              type="text"
              value={role.info}
              onChange={(e) => handleRoleChange(index, 'info', e.target.value)}
              placeholder="Информация о роли"
            />
          </div>
        ))}
        <button onClick={addRole}>Добавить роль</button>

        <h3>Навыки</h3>
        {skills.map((skill, index) => (
          <div key={index} className='input-conteiner'>
            <input
              type="text"
              value={skill.name}
              onChange={(e) => handleSkillChange(index, e.target.value)}
              placeholder="Навык"
            />
          </div>
        ))}
        <button onClick={addSkill}>Добавить навык</button>

        <h3>Языки</h3>
        {languages.map((language, index) => (
          <div key={index} className='input-conteiner'>
            <input
              type="text"
              value={language.name}
              onChange={(e) => handleLanguagesChange(index, e.target.value)}
              placeholder="Язык"
            />
          </div>
        ))}
        <button onClick={addLanguages}>Добавить язык</button>

        <h3>Видео ссылка</h3>
        <div className='input-conteiner'>
          <input
            type="text"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            placeholder="Ссылка на видео"
          />
        </div>

        <div className='modal-button-conteiner'>
          <button onClick={handleSave}>Сохранить</button>
          <button onClick={onClose}>Отмена</button>
        </div>
      </div>
    </div>
  );
};

export default ItemForm;