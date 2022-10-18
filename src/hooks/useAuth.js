import { useState } from 'react';

// eslint-disable-next-line no-unused-vars
import db from '../firebase/config';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
} from 'firebase/auth';

import { doc, setDoc, Timestamp } from 'firebase/firestore';

const useAuth = () => {
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState();

  const auth = getAuth();
  auth.languageCode = 'pt-BR';
  const actionCodeSettings = {
    url: 'http://192.168.1.8:3000',
  };

  const register = async (data) => {
    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      const dbUser = {
        admin: false,
        email: data.email,
        createdAt: Timestamp.now(),
      };

      await setDoc(doc(db, 'users', user.uid), dbUser);
      await user.sendEmailVerification();

      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  const login = async (user) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, user.email, user.password);
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  const logout = () => {
    signOut(auth);
  };

  const verifyEmail = async (user) => {
    setLoading(true);
    try {
      await sendEmailVerification(user, actionCodeSettings);
      setMessage(
        'E-mail de validação enviado com sucesso. Por favor, verifique sua caixa de entrada ou spam.',
      );
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      setMessage(
        'E-mail de redefinição enviado com sucesso, verifique sua caixa de entrada ou spam.',
      );
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  const updateUser = async (user, data) => {
    setLoading(true);

    try {
      await updateProfile(user, data);
      setMessage('Dados atualizados com sucesso!');
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  const updatePass = async (user, data) => {
    setLoading(true);

    try {
      await updatePassword(user, data);
      setMessage('Senha atualizada com sucesso!');
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return {
    register,
    login,
    logout,
    verifyEmail,
    resetPassword,
    updateUser,
    updatePass,
    error,
    message,
    loading,
    auth,
  };
};

export default useAuth;
