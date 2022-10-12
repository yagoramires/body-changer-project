import React, { useEffect, useState } from 'react';

import useAuth from '../../hooks/useAuth';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';

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
    <section>
      <form onSubmit={handleSubmit} className='form'>
        <input
          type='email'
          value={email || ''}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type='password'
          value={password || ''}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {loading ? (
          <AiOutlineLoading3Quarters />
        ) : (
          <input type='submit' value='Entrar' />
        )}

        {error && <p className='error'>{error}</p>}
      </form>
    </section>
  );
};

export default Login;
