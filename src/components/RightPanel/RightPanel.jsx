import s from "./rightPanel.module.scss";
// import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HandySvg } from "handy-svg";
import { useDispatch } from "react-redux";
import {
  getWalletsTransactions,
  deleteWallet,
} from "../../redux/wallets/wallets-operations";
import { Confirm } from "notiflix/build/notiflix-confirm-aio";

import walletIcon from "../../assets/images/wallet-icon.svg";
import buttonSend from "../../assets/images/button-send.svg";
import buttonRecive from "../../assets/images/button-recive.svg";
import arrowLeftIcon from "../../assets/images/arrow-left.svg";
import RefreshIcon from "../../assets/images/refresh-icon.svg";
import DeleteIcon from "../../assets/images/delete-ico.svg";

const RightPanel = ({
  walletName,
  balance,
  leftPanelIsOpen,
  id,
  adress,
  // scrollHandler,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const scrollHandler = (e) => {
  //   console.log("scroll");
  // };

  // console.log(id);
  // console.log(adress);
  return (
    <div className={leftPanelIsOpen ? s.rightPanelSided : s.rightPanel}>
      <button onClick={() => navigate(-1)} className={s.arrowLeftIcon}>
        <HandySvg src={arrowLeftIcon} width="45" height="45" />
      </button>
      <div className={s.headingWrapper}>
        <HandySvg
          onClick={() => {
            Confirm.show(
              "Delete wallet",
              `Are you sure You want to delete wallet "${walletName}"?`,
              "Yes",
              "No",
              () => {
                dispatch(deleteWallet(id));
                console.log("Dispath delete");
              },
              () => {
                console.log("don`t delete");
              },
              {}
            );
            // dispatch(getWalletsTransactions(adress));
          }}
          className={s.DeleteIcon}
          src={DeleteIcon}
          width="50"
          height="50"
        />
        <h2 className={s.rightPanelHeading}>
          {walletName ? walletName : `PLEASE SELECT A WALLET`}
        </h2>
        <Link
          className={s.walletIcoWrapper}
          to={walletName ? `/wallet-details/${id}` : "#"}
        >
          <HandySvg
            className={s.walletIco}
            src={walletIcon}
            width="50"
            height="50"
          />
        </Link>

        {adress ? (
          <HandySvg
            onClick={() => {
              dispatch(getWalletsTransactions(adress));
            }}
            className={s.RefreshIco}
            src={RefreshIcon}
            width="50"
            height="50"
          />
        ) : (
          ""
        )}
      </div>
      <div className={s.walletBalaneWrapper}>
        <p className={s.walletBalaneHeading}>Balance:</p>
        <p className={s.walletBalane}>{`${
          balance ? balance : "0.00000"
        } NATURE`}</p>
      </div>
      <div className={s.buttonsWrapper}>
        <Link
          to={walletName ? `/send-from/${adress}` : "#"}
          className={s.button}
        >
          <img className={s.buttonImg} src={buttonSend} alt="send" />
        </Link>
        <Link to={walletName ? `/recive/${id}` : "#"} className={s.button}>
          <img className={s.buttonImg} src={buttonRecive} alt="recive" />
        </Link>
      </div>
    </div>
  );
};

export default RightPanel;
