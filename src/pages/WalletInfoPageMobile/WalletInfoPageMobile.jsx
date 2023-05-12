import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getAllWallets,
  walletsTransactions,
} from "../../redux/wallets/wallets-selectors";
import { useSelector } from "react-redux";
import RightPanel from "../../components/RightPanel";
import TransactionsList from "../../components/TransactionsList";
import s from "./walletInfoPageMobile.module.scss";

export default function WalletInfoPageMobile() {
  const [listOfTransactions, setListOfTransactions] = useState([]);
  const params = useParams();
  const wallets = useSelector(getAllWallets);
  const transactions = useSelector(walletsTransactions);
  const wallet = wallets.find((el) => {
    return el._id === params.id;
  });
  useEffect(() => {
    setListOfTransactions(transactions);
  }, [transactions]);
  return (
    <div className={s.section}>
      <RightPanel
        walletName={wallet.walletName}
        balance={wallet.amount}
        adress={wallet.walletAdress}
        id={wallet._id}
      />
      <TransactionsList
        selectedWalletAdress={wallet.walletAdress}
        transactions={listOfTransactions}
      />
    </div>
  );
}
