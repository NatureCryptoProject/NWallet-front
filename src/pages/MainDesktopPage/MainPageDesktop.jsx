import React, { useState, useEffect } from "react";
import LeftPanel from "../../components/LeftPanel/LeftPanel";
import {
  getWallets,
  getWalletsTransactions,
} from "../../redux/wallets/wallets-operations";
import {
  getAllWallets,
  walletsTransactions,
  getIsWalletsLoading,
} from "../../redux/wallets/wallets-selectors";
import { useDispatch, useSelector } from "react-redux";
import RightPanel from "../../components/RightPanel/RightPanel";
import TransactionsList from "../../components/TransactionsList/TransactionsList";
import WalletsListPageMobile from "../WalletsListPageMobile/WalletsListPageMobile";
import s from "./mainPageDesktop.module.scss";
// import _ from "lodash";

export default function MainPageDesktop({ leftPanelIsOpen }) {
  const dispatch = useDispatch();
  const [selectedWallet, setSelectedWallet] = useState([]);
  const [walletData, setWalletData] = useState({});
  const [windowSize, setWindowSize] = useState(window.innerWidth); // eslint-disable-next-line
  const [pagination, setPagination] = useState({ offset: 0, limit: 10 });

  const wallets = useSelector(getAllWallets);
  const transactions = useSelector(walletsTransactions);
  const isWalletsLoading = useSelector(getIsWalletsLoading);

  // console.log(pagination);

  // console.log(wallets);

  useEffect(() => {
    dispatch(getWallets());
  }, [dispatch]);
  useEffect(() => {
    const wallet = selectedWallet.find((el) => el.isSelected === true);
    if (wallet) {
      dispatch(
        getWalletsTransactions({
          adress: wallet.walletAdress,
          offset: pagination.offset,
          limit: pagination.limit,
        })
      );
    }
  }, [selectedWallet, dispatch, pagination]);

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

  // useEffect(() => {
  //   const section = document.getElementsByClassName(s.section);
  //   section[0].addEventListener("scroll", (e) => {
  //     if (
  //       section[0].scrollTop + section[0].clientHeight + 2 >=
  //       section[0].scrollHeight
  //     ) {
  //       const wallet = selectedWallet.find((el) => el.isSelected === true);
  //       // console.log(wallet);
  //       if (wallet) {
  //         dispatch(
  //           getWalletsTransactions({
  //             adress: wallet.walletAdress,
  //             offset: pagination.offset,
  //             limit: pagination.limit,
  //           })
  //         ).then(() => {
  //           setPagination({
  //             offset: pagination.offset + 10,
  //             limit: pagination.limit + 10,
  //           });
  //         });
  //       }
  //     }
  //   });
  // }, [pagination, dispatch, selectedWallet]);

  const handleSelectWallet = (id) => {
    setSelectedWallet(
      wallets.map((el) => {
        if (el._id === id) {
          setWalletData(el);
          return { isSelected: true, ...el };
        } else {
          return { isSelected: false, ...el };
        }
      })
    );
  };

  // const handleLoadMoreTransactions = () => {
  //   const wallet = selectedWallet.find((el) => el.isSelected === true);
  //   if (wallet) {
  //     dispatch(
  //       getWalletsTransactions({
  //         adress: wallet.walletAdress,
  //         offset: pagination.offset + 10,
  //         limit: pagination.limit + 10,
  //       })
  //     ).then(() => {
  //       setPagination({
  //         offset: pagination.offset + 10,
  //         limit: pagination.limit + 10,
  //       });
  //     });
  //   }
  // };
  return (
    <>
      {windowSize < 768 ? (
        <WalletsListPageMobile
          handleSelectWallet={handleSelectWallet}
          wallets={selectedWallet.length > 0 ? selectedWallet : wallets}
        />
      ) : (
        <>
          <LeftPanel
            isLoading={isWalletsLoading.getWalletsLoading}
            wallets={selectedWallet.length > 0 ? selectedWallet : wallets}
            handleSelectWallet={handleSelectWallet}
            leftPanelIsOpen={leftPanelIsOpen}
          />
          <section className={s.section}>
            {walletData._id ? (
              <>
                <RightPanel
                  walletName={walletData.walletName}
                  balance={walletData.amount}
                  id={walletData._id}
                  adress={walletData.walletAdress}
                  leftPanelIsOpen={leftPanelIsOpen}
                  // scrollHandler={scrollHandler}
                />
                <TransactionsList
                  isLoading={isWalletsLoading.getTransactionsLoading}
                  selectedWalletAdress={
                    selectedWallet.find((el) => el.isSelected === true)
                      ?.walletAdress
                  }
                  transactions={transactions}
                  leftPanelIsOpen={leftPanelIsOpen}
                />
                {/* <button
                  onClick={handleLoadMoreTransactions}
                  className={
                    leftPanelIsOpen
                      ? s["loadMoreButton--top-sided"]
                      : s["loadMoreButton--top"]
                  }
                >
                  Load More
                </button> */}
              </>
            ) : (
              <div
                className={leftPanelIsOpen ? s.rightPanelSided : s.rightPanel}
              >
                <h2 className={s.rightPanelHeading}>PLEASE SELECT A WALLET</h2>
              </div>
            )}
          </section>
        </>
      )}
    </>
  );
}
