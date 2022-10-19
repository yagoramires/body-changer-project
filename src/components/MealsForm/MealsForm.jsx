import React, { useEffect, useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

const MealsForm = () => {
  const mealsTypes = [
    'Café da Manha',
    'Almoço',
    'Lanche',
    'Jantar',
    'Ceia',
    'Pré Treino',
    'Pós Treino',
  ];

  const [selectedUser, setSelectedUser] = useState();
  const [mealType, setMealType] = useState();
  const [mealItem, setMealItem] = useState();
  const [mealItemWeight, setMealItemWeight] = useState();
  const [newMenu, setNewMenu] = useState([]);

  const { documents: users } = useFetchDocuments('users');

  const handleAddItem = (e) => {
    e.preventDefault();

    const meal = {
      type: mealType,
      item: mealItem,
      weight: mealItemWeight,
    };

    setNewMenu([...newMenu, meal]);
    setMealItem();
    setMealItemWeight();
  };

  return (
    <div>
      <select
        name='users'
        defaultValue='selected'
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option disabled value='selected'>
          Selecione
        </option>
        {users &&
          users.map((user) => (
            <option value={user.email} key={user.id}>
              {user.email}
            </option>
          ))}
      </select>

      {mealsTypes.map((meal, index) => (
        <div key={index}>
          <h3>{meal}</h3>
          <div>
            {newMenu.map(
              (item, index) =>
                meal === item.type && (
                  <div key={index}>
                    <p>{item.item}</p>
                    <p>{item.weight}</p>
                  </div>
                ),
            )}
          </div>
        </div>
      ))}

      <form onSubmit={handleAddItem} className='form'>
        <select
          name='meals'
          defaultValue='selected'
          onChange={(e) => setMealType(e.target.value)}
        >
          <option disabled value='selected'>
            Selecione
          </option>
          {mealsTypes.map((meal) => (
            <option value={meal} key={meal}>
              {meal}
            </option>
          ))}
        </select>
        <label>
          <span>Alimento</span>
          <input
            type='text'
            value={mealItem || ''}
            onChange={(e) => {
              setMealItem(e.target.value);
            }}
            placeholder='Alimento'
            autoComplete='off'
          />
        </label>
        <label>
          <span>Quantidade</span>
          <input
            type='number'
            value={mealItemWeight || ''}
            onChange={(e) => {
              setMealItemWeight(e.target.value);
            }}
            placeholder='Alimento'
            autoComplete='off'
          />
        </label>

        <input type='submit' value='Adicionar' />
      </form>
    </div>
  );
};

export default MealsForm;
