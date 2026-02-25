import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const validUsername = 'admin'; // Зашифрованный логин
    const validPassword = '1234';  // Зашифрованный пароль

    if (username === validUsername && password === validPassword) {
      navigate('/admin');
    } else {
      setError('Неверный логин или пароль');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Вход</h2>
        {error && <p className='error'>{error}</p>}
        <input
          type="text"
          placeholder="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='login-button_container'>
          <button onClick={handleLogin} className='login-button'>Войти</button>
          <button onClick={handleCancel} className='login-button'>Отмена</button>
        </div>
      </div>
    </div>
  );
};

export default Login;