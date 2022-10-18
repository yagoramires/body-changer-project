import React, { useState } from 'react';

const AddMealModal = () => {
  const [meals, setMeals] = useState(undefined);
  const [meal, setMeal] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleNewMeal = (e) => {
    e.preventDefault();
  };

  return (
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
  );
};

export default AddMealModal;
