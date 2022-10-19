import React, { useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

const MealsForm = () => {
  const MealsTypes = [
    'Café da Manha',
    'Almoço',
    'Lanche',
    'Jantar',
    'Ceia',
    'Pré Treino',
    'Pós Treino',
  ];

  const [selecteUser, setSelecteUser] = useState();
  const [mealType, setMealType] = useState();
  const [mealItem, setMealItem] = useState();
  const [mealItemWeight, setMealItemWeight] = useState();
  const [newMenu, setNewMenu] = useState([]);

  const { documents: users } = useFetchDocuments('users');
  console.log(selecteUser);
  console.log(mealType);

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

  console.log(newMenu);

  return (
    <div>
      <select
        name='users'
        defaultValue='selected'
        onChange={(e) => setSelecteUser(e.target.value)}
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

      {newMenu.map((meal, index) => (
        <>
          <p key={index}>{meal.type}</p>
          {/* <div>{newMenu.filter((meal) => meal.type === meal.type)}</div> */}
        </>
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
          {MealsTypes.map((meal) => (
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
