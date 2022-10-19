import React, { useEffect, useState } from 'react';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import useAuth from '../../hooks/useAuth';

import styles from './Auth.module.css';

const Register = () => {
  // User data states
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  // Error state
  const [error, setError] = useState();

  const { register, error: registerError, loading } = useAuth();

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

    if (password !== confirmPassword) {
      setError('As senhas devem ser iguais.');
      return;
    }

    const userData = {
      email,
      password,
    };

    register(userData);
  };

  useEffect(() => {
    if (registerError) {
      setError(registerError);
    }
  }, [registerError]);

  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 5000);
  }, [error]);

  return (
    <section className={styles.section}>
      <form onSubmit={handleSubmit} className='form'>
        <h4>Cadastre-se e mude seu corpo!</h4>

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
        <input
          type='password'
          value={confirmPassword || ''}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          placeholder='Confirmação de senha'
          autoComplete='on'
        />
        {loading ? (
          <AiOutlineLoading3Quarters className='loading' />
        ) : (
          <input type='submit' value='Cadastrar' />
        )}

        {error && <p className='error'>{error}</p>}
      </form>
    </section>
  );
};

export default Register;
