import React, { useEffect, useState } from 'react';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import useAuth from '../../hooks/useAuth';

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
    <section>
      <form onSubmit={handleSubmit} className='form'>
        <h4>Cadastre-se e mude seu corpo!</h4>

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
        <input
          type='password'
          value={confirmPassword || ''}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        {loading ? (
          <AiOutlineLoading3Quarters />
        ) : (
          <input type='submit' value='Cadastrar' />
        )}

        {error && <p className='error'>{error}</p>}
      </form>
    </section>
  );
};

export default Register;
