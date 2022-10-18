import React, { useEffect, useState } from 'react';

import useAuth from '../../hooks/useAuth';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MdOutlineClose } from 'react-icons/md';
import { Link } from 'react-router-dom';

import styles from './Auth.module.css';

const Login = () => {
  // User data states
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // Error state
  const [error, setError] = useState();
  // Message state
  const [message, setMessage] = useState();

  // Modal state
  const [active, setActive] = useState(false);

  const {
    login,
    resetPassword,
    error: loginError,
    message: loginMessage,
    loading,
  } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === '') {
      setError('Preencha o e-mail.');
      return;
    }

    if (password === '') {
      setError('Preencha a senha.');
      return;
    }

    const userData = {
      email,
      password,
    };

    login(userData);
  };

  const handleResetPass = (e) => {
    e.preventDefault();

    if (email === '') {
      setError('Preencha o e-mail.');
      return;
    }

    resetPassword(email);
  };

  useEffect(() => {
    if (loginError) {
      setError(loginError);
    }
    if (loginMessage) {
      setMessage(loginMessage);
    }
  }, [loginError, loginMessage]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('');
      }, 5000);
    }
    if (message) {
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  }, [error, message]);

  return (
    <section className={styles.section}>
      <form onSubmit={handleSubmit} className='form'>
        <h4>Entre para mudar seu corpo</h4>
        <input
          type='email'
          value={email || ''}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder='E-mail'
          autoComplete='on'
        />
        <input
          type='password'
          value={password || ''}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder='Senha'
          autoComplete='on'
        />
        {loading ? (
          <AiOutlineLoading3Quarters className='loading' />
        ) : (
          <input type='submit' value='Entrar' />
        )}

        {error && <p className='error'>{error}</p>}

        <div className='divider'></div>

        <p>
          Esqueceu sua senha?{' '}
          <span onClick={() => setActive(true)}>Recupere-a</span>
        </p>
        <p>
          Não possui uma conta? <Link to='/register'>Registre-se</Link>
        </p>
      </form>

      <div className={`modal ${active ? '' : 'hide'}`}>
        <form onSubmit={handleResetPass} className='form'>
          <div className='modal-close-container'>
            <p>Recuperação de Senha</p>
            <MdOutlineClose onClick={() => setActive(false)} />
          </div>
          <input
            type='email'
            value={email || ''}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder='E-mail'
          />

          {loading ? (
            <AiOutlineLoading3Quarters className='loading' />
          ) : (
            <input type='submit' value='Enviar' />
          )}

          {message && <p className='success'>{message}</p>}
          {error && <p className='error'>{error}</p>}
        </form>
      </div>
    </section>
  );
};

export default Login;
