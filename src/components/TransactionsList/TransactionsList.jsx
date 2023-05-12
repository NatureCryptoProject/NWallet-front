import s from "./transactionsList.module.scss";
import Transaction from "./Transaction/Transaction";

import { BallTriangle } from "react-loader-spinner";

const style = {
  position: "absolute",
  top: "calc((100 / 1440) * 100vw)",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const sidedStyle = {
  position: "absolute",
  top: "calc((100 / 1440) * 100vw)",
  left: "50%",
  transform: "translate(calc((160 / 1440) * 100vw), -50%)",
};

const TransactionsList = ({
  isLoading,
  selectedWalletAdress,
  transactions,
  leftPanelIsOpen,
}) => {
  // console.log(transactions);
  return (
    <div className={s.transactionsWrapper}>
      {isLoading ? (
        <div style={leftPanelIsOpen ? sidedStyle : style}>
          <BallTriangle
            height={60}
            width={60}
            radius={5}
            color="#fff"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
        </div>
      ) : (
        <ul
          className={
            leftPanelIsOpen ? s.transactionsListSided : s.transactionsList
          }
        >
          {transactions
            ? transactions.map((el) => {
                return (
                  <Transaction
                    key={el.timestamp}
                    selectedWalletAdress={selectedWalletAdress}
                    amount={el.amount}
                    reciver={el.reciver}
                    sender={el.sender}
                    date={el.timestamp}
                  />
                );
              })
            : ""}
        </ul>
      )}
    </div>
  );
};

export default TransactionsList;
