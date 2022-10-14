import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <section>
      <Link to='/diary'>Diario</Link>
    </section>
  );
};

export default Home;
