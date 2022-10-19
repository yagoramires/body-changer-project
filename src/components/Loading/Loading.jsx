import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Loading = () => {
  return (
    <section>
      <AiOutlineLoading3Quarters
        className='loading'
        style={{ fontSize: '1.5rem' }}
      />
      <p style={{ fontSize: '1.5rem' }}>Carregando ...</p>
    </section>
  );
};

export default Loading;
