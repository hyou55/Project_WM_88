import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../styles/Nav.module.css';

const Navbar = () => {
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
      textDecoration: isActive ? 'none' : 'underline',
    };
  };

  return (
    <header>
    <nav>
      <div2>
        워드마스터
      </div2>
      <div>
        <NavLink to="/main" activeclassname='active' className={styles.mainbar}>
          메인검색
        </NavLink>
      </div>
      <div>
        <NavLink to="/image" activeclassname='active' className={styles.mainbar}>
          이미지검색
        </NavLink>
      </div>
      <div>
        <NavLink to="/keyword" activeclassname='active' className={styles.mainbar}>
          키워드검색
        </NavLink>
      </div>
      <div> <NavLink to="/myword" activeclassname='active' className={styles.mainbar}>
          My단어장
        </NavLink>
      </div>
      <div>
        <NavLink to="/" activeclassname='active' className={styles.Loginbutton}>
          로그인
        </NavLink>
      </div>
    </nav>
    </header>
  );
};

export default Navbar;