import { NavLink, Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to='/'>
        body<span>Changer</span>
      </Link>

      <ul className={styles.nav}>
        <li>
          <NavLink to='/login'>Login</NavLink>
        </li>
        <li>
          <NavLink to='/register'>Register</NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
