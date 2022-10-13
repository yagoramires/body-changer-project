import React, { useEffect, useState } from 'react';

import useAuth from '../../hooks/useAuth';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import styles from './Auth.module.css';

const Login = () => {
  // User data states
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // Error state
  const [error, setError] = useState();

  const { login, error: loginError, loading } = useAuth();

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

  useEffect(() => {
    if (loginError) {
      setError(loginError);
    }
  }, [loginError]);

  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 5000);
  }, [error]);

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
        />
        <input
          type='password'
          value={password || ''}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder='Senha'
        />
        {loading ? (
          <AiOutlineLoading3Quarters className='loading' />
        ) : (
          <input type='submit' value='Entrar' />
        )}

        {error && <p className='error'>{error}</p>}

        <div className='divider'></div>

        <p>
          Esqueceu sua senha? <Link>Recupere-a</Link>
        </p>
        <p>
          Não possui uma conta? <Link to='/register'>Registre-se</Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
