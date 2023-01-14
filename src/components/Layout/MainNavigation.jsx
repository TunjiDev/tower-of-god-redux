import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { authActions } from "../../redux-store/auth";

import styles from "./MainNavigation.module.css";
import AuthContext from "../../context-store/authContext";

const MainNavigation = () => {
  // const [click, setClick] = useState(false);
  const navIsClicked = useSelector((state) => state.auth.navClick);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(authActions.navClickSwitch());
    // console.log(navIsClicked);
  };

  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <header className={styles.mainNavigation__header}>
      <Link to="/">
        <div className={styles.mainNavigation__logo}>Tower of God</div>
      </Link>
      <nav className={styles.mainNavigation__nav}>
        <ul
          className={
            navIsClicked ? `${styles.mainNavigation__menu} ${styles.active}` : `${styles.mainNavigation__menu}`
          }
        >
          {!isLoggedIn && (
            <li>
              <Link onClick={handleClick} to="/auth">
                Login
              </Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <Link onClick={handleClick} to="/all-characters">
                All Characters
              </Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <Link onClick={handleClick} to="/new-character">
                Add Character
              </Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>

        {/* {isLoggedIn && ( */}
        <div className={styles.mainNavigation__hamburger} onClick={handleClick}>
          {navIsClicked ? (
            <FaTimes size={20} style={{ color: "#fff" }} />
          ) : (
            <FaBars size={20} style={{ color: "#fff" }} />
          )}
        </div>
        {/* )} */}
      </nav>
    </header>
  );
};

export default MainNavigation;
