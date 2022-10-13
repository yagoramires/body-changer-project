// Router
import { Routes, Route, Navigate } from 'react-router-dom';

// Components
import Header from './components/Header/Header';

// Pages
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { useLayoutEffect, useState } from 'react';

// Auth
import useAuth from './hooks/useAuth';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuth();

  useLayoutEffect(() => {
    onAuthStateChanged(auth, async (userParams) => {
      setUser(userParams);
    });
  }, [auth]);

  if (user === undefined) {
    return <p>Carregando...</p>;
  }

  return (
    <div className='App'>
      <Header user={user} />
      <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
        <Route
          path='/login'
          element={!user ? <Login /> : <Navigate to='/' />}
        />
        <Route
          path='/register'
          element={!user ? <Register /> : <Navigate to='/' />}
        />
      </Routes>
    </div>
  );
}

export default App;
