import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = ({ admin }) => {
  return (
    <section>
      <Link to='/diary'>Diario</Link>
      <Link to='/dashboard'>Dashboard</Link>
    </section>
  );
};

export default Home;
