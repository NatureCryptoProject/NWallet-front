import React from "react";
import WalletsList from "../../components/LeftPanel/WalletsList";
import s from "./walletsListPageMobile.module.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/auth-operations";

const WalletsListPageMobile = ({ wallets, handleSelectWallet }) => {
  const dispatch = useDispatch();
  return (
    <div className={s.section}>
      <div className={s.leftPanel}>
        <WalletsList
          wallets={wallets}
          handleSelectWallet={handleSelectWallet}
        />
      </div>
      <div className={s.buttonsWrapper}>
        <Link
          to="/add-existing-wallet"
          className={s.headerButton}
          type="button"
        >
          NEW WALLET
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
    </div>
  );
};

export default WalletsListPageMobile;
