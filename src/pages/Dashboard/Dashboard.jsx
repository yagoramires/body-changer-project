import React, { useState } from 'react';
import MealsForm from '../../components/MealsForm/MealsForm';

const Dashboard = () => {
  return (
    <section>
      <div>Adicionar dieta</div>
      <MealsForm />
    </section>
  );
};

export default Dashboard;
