import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebaseConfig';
import './ActorModal.css'

const EditModal = ({ item, onSave, onClose }) => {
  const [name, setName] = useState(item.name);
  const [birthDate, setBirthDate] = useState(item.birthDate);
  const [height, setHeight] = useState(item.height);
  const [hairColor, setHairColor] = useState(item.hairColor);
  const [eyeColor, setEyeColor] = useState(item.eyeColor);
  const [university, setUniversity] = useState(item.university);
  const [agent, setAgent] = useState(item.agent);
  const [agentPhone, setAgentPhone] = useState(item.agentPhone);
  const [gender, setGender] = useState(item.gender || '');
  const [instagram, setInstagram] = useState(item.instagram || '');
  const [telegram, setTelegram] = useState(item.telegram || '');
  const [vk, setVk] = useState(item.vk || '');
  const [videoLink, setVideoLink] = useState(item.videoLink || '');
  const [roles, setRoles] = useState(item.roles || [{ year: '', info: '' }]);
  const [skills, setSkills] = useState(item.skills || [{ name: '' }]);
  const [languages, setLanguages] = useState(item.languages || [{ name: '' }]);
  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState(new Array(5).fill(null));
  const [films, setFilms] = useState(item.films || [{ year: '', info: '' }]);

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
      let mainImageUrl = item.mainImageUrl;
      if (mainImage) {
        const mainImageRef = ref(storage, `images/${name}_main`);
        await uploadBytes(mainImageRef, mainImage);
        mainImageUrl = await getDownloadURL(mainImageRef);
      }

      const updatedAdditionalImages = await Promise.all(additionalImages.map(async (image, index) => {
        if (image) {
          const imageRef = ref(storage, `images/${name}_additional_${index}`);
          await uploadBytes(imageRef, image);
          return await getDownloadURL(imageRef);
        }
        return item.additionalImageUrls ? item.additionalImageUrls[index] : null;
      }));

      const trimmedVideoLink = videoLink.replace('https://youtu.be/', '');

      const updatedItem = {
        id: item.id,
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
        additionalImageUrls: updatedAdditionalImages,
        films,
        roles,
        skills,
        languages,
        videoLink: trimmedVideoLink 
      };

      onSave(updatedItem);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <h2 className='add-new-item'>Edit Item</h2>
        <div className='input-conteiner'>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            type="number"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            placeholder="Birth Date"
          />
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Height"
          />
          <input
            type="text"
            value={hairColor}
            onChange={(e) => setHairColor(e.target.value)}
            placeholder="Hair Color"
          />
          <input
            type="text"
            value={eyeColor}
            onChange={(e) => setEyeColor(e.target.value)}
            placeholder="Eye Color"
          />
          <input
            type="text"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            placeholder="University"
          />
          <input
            type="text"
            value={agent}
            onChange={(e) => setAgent(e.target.value)}
            placeholder="Agent"
          />
          <input
            type="text"
            value={agentPhone}
            onChange={(e) => setAgentPhone(e.target.value)}
            placeholder="Agent Phone"
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
            placeholder="Main Image"
          />
        </div>
        <div className='input-conteiner'>
          {[...Array(5)].map((_, index) => (
            <input
              key={index}
              type="file"
              onChange={(e) => handleAdditionalImagesChange(e, index)}
              placeholder={`Additional Image ${index + 1}`}
            />
          ))}
        </div>
        <h3>Filmography</h3>
        {films.map((film, index) => (
          <div key={index} className='input-conteiner'>
            <input
              type="text"
              value={film.year}
              onChange={(e) => handleFilmChange(index, 'year', e.target.value)}
              placeholder="Year"
            />
            <input
              type="text"
              value={film.info}
              onChange={(e) => handleFilmChange(index, 'info', e.target.value)}
              placeholder="Film Info"
            />
          </div>
        ))}
        <button onClick={addFilm}>Add Film</button>
        
        <h3>Роли в театре</h3>
        {roles.map((role, index) => (
          <div key={index} className='input-conteiner'>
            <input
              type="text"
              value={role.year}
              onChange={(e) => handleRoleChange(index, 'year', e.target.value)}
              placeholder="Year"
            />
            <input
              type="text"
              value={role.info}
              onChange={(e) => handleRoleChange(index, 'info', e.target.value)}
              placeholder="Role Info"
            />
          </div>
        ))}
        <button onClick={addRole}>Add Role</button>

        <h3>Навыки</h3>
        {skills.map((skill, index) => (
          <div key={index} className='input-conteiner'>
            <input
              type="text"
              value={skill.name}
              onChange={(e) => handleSkillChange(index, e.target.value)}
              placeholder="Skill"
            />
          </div>
        ))}
        <button onClick={addSkill}>Add Skill</button>

        <h3>Языки</h3>
        {languages.map((language, index) => (
          <div key={index} className='input-conteiner'>
            <input
              type="text"
              value={language.name}
              onChange={(e) => handleLanguagesChange(index, e.target.value)}
              placeholder="Language"
            />
          </div>
        ))}
        <button onClick={addLanguages}>Add Language</button>

        <h3>Видео ссылка</h3>
        <div className='input-conteiner'>
          <input
            type="text"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            placeholder="Video Link"
          />
        </div>

        <div className='modal-button-conteiner'>
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;