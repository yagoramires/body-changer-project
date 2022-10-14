import React, { useState } from 'react';

import styles from './Diary.module.css';
import { AiFillAlert } from 'react-icons/ai';

const Diary = () => {
  const [meals, setMeals] = useState(undefined);
  const [meal, setMeal] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleNewMeal = (e) => {
    e.preventDefault();
  };

  return (
    <section className={styles.diary}>
      {meals ? <div></div> : <p> Nenhuma refeição cadastrada.</p>}
      <div>
        <form onSubmit={handleNewMeal}>
          <select>
            <option value=''></option>
          </select>
          <input
            type='text'
            value={meal || ''}
            onChange={(e) => {
              setMeal(e.target.value);
            }}
            placeholder='Alimento'
          />
          <input
            type='number'
            value={quantity || ''}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            placeholder='Qnt (g)'
          />
          <input type='submit' value='add' />
        </form>
      </div>
    </section>
  );
};

export default Diary;
