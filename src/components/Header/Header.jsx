import { NavLink, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import styles from './Header.module.css';

const Header = ({ user }) => {
  const { logout } = useAuth();

  return (
    <header className={styles.header}>
      <Link to='/'>
        body<span>Changer</span>
      </Link>

      {user ? (
        <ul className={styles.nav}>
          <li onClick={logout}>Sair</li>
        </ul>
      ) : (
        <ul className={styles.nav}>
          <li>
            <NavLink to='/login'>Login</NavLink>
          </li>
          <li>
            <NavLink to='/register'>Register</NavLink>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Header;
