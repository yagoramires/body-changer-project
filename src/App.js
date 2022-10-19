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
import Diary from './pages/Diary/Diary';
import { useFetchDocument } from './hooks/useFetchDocument';
import Dashboard from './pages/Dashboard/Dashboard';
import Loading from './components/Loading/Loading';

function App() {
  const [user, setUser] = useState(undefined);
  const [admin, setAdmin] = useState(undefined);
  const { auth } = useAuth();

  useLayoutEffect(() => {
    onAuthStateChanged(auth, async (userParams) => {
      setUser(userParams);
    });
  }, [auth]);

  const { document: userDoc } = useFetchDocument('users', user?.uid);

  useLayoutEffect(() => {
    if (userDoc && userDoc.admin === true) {
      setAdmin(true);
    } else if (userDoc && userDoc.admin === false) {
      setAdmin(false);
    }
  }, [userDoc]);

  if (user === undefined) {
    return <Loading />;
  }
  if (admin === undefined) {
    return <Loading />;
  }

  return (
    <div className='App'>
      <Header user={user} />
      <Routes>
        <Route
          path='/'
          element={user ? <Home admin={admin} /> : <Navigate to='/login' />}
        />
        <Route
          path='/login'
          element={!user ? <Login /> : <Navigate to='/' />}
        />
        <Route
          path='/register'
          element={!user ? <Register /> : <Navigate to='/' />}
        />
        <Route
          path='/dashboard'
          element={user && admin ? <Dashboard /> : <Navigate to='/' />}
        />
        <Route path='/diary' element={user ? <Diary /> : <Navigate to='/' />} />
      </Routes>
    </div>
  );
}

export default App;
