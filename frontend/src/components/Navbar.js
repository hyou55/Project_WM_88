import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/Nav.module.css";
import logo2 from "../styles/img/logo2.png";

const Navbar = () => {
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: isActive ? "none" : "underline",
    };
  };

  return (
    <nav>
      <img className={styles.logoimg} src={logo2} />
      <div>
        <NavLink to="/main" activeclassname="active" className={styles.mainbar}>
          메인 검색
        </NavLink>
      </div>
      <div>
        <NavLink to="/image" activeclassname="active" className={styles.mainbar}>
          이미지 검색
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
