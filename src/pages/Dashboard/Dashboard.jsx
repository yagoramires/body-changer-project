import React, { useState } from 'react';

import { useFetchDocuments } from '../../hooks/useFetchDocuments';

const Dashboard = () => {
  const [quantity, setQuantity] = useState(null);

  const { documents } = useFetchDocuments('users');
  console.log(quantity);
  const handleNewMeal = (e) => {
    e.preventDefault();
  };
  return (
    <section>
      <div>
        Adicionar dieta
        <form onSubmit={handleNewMeal}>
          <select name='users'>
            {documents &&
              documents.map((user) => (
                <option value={user.email} key={user.id}>
                  {user.email}
                </option>
              ))}
          </select>
          <select
            name='quantity'
            onSelect={(e) => {
              setQuantity(Number(e.target.value()));
            }}
          >
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
          </select>

          {quantity && <></>}

          <input type='submit' value='Adicionar' />
        </form>
      </div>
    </section>
  );
};

export default Dashboard;
