import { useState, useEffect } from "react";
import s from "./header.module.scss";
import mainLogo from "../../assets/images/main-logo.svg";
import mainLogoMobile from "../../assets/images/main-logo-mobile.svg";
import { Link } from "react-router-dom";
import { getIslogin } from "../../redux/auth/auth-selectors";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/auth/auth-operations";

const Header = ({ handleOpenLeftPanel }) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const islogin = useSelector(getIslogin);

  const resizeHandler = () => {
    setWindowSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    resizeHandler();
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);
  return (
    <header className={s.header}>
      <div className={s.headerContainer}>
        <div onClick={handleOpenLeftPanel} className={s.logoWrapper}>
          {windowSize < 768 ? (
            <Link to="/">
              <img className={s.logo} src={mainLogoMobile} alt="logo" />
            </Link>
          ) : (
            <img className={s.logo} src={mainLogo} alt="logo" />
          )}
          {windowSize < 768 ? (
            <Link to="/">
              <h1 className={s.heading}>NWALLET</h1>
              <h1 className={s.subheading}>(TESTNET)</h1>
            </Link>
          ) : (
            <>
              <h1 className={s.heading}>NWALLET</h1>
              <h1 className={s.subheading}>(TESTNET)</h1>
            </>
          )}
        </div>
        {islogin ? (
          <div className={s.headerButtonsWrapper}>
            <Link
              to="/add-existing-wallet"
              className={s.headerButton}
              type="button"
            >
              ADD WALLET
            </Link>
            <button
              onClick={() => {
                dispatch(logout());
              }}
              className={s.headerButton}
              type="button"
            >
              LOG OUT
            </button>
          </div>
        ) : (
          <div className={s.headerButtonsWrapper}>
            <Link to="/login" className={s.headerButton}>
              SIGN IN
            </Link>
            <Link to="/register" className={s.headerButton}>
              REGISTER
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
