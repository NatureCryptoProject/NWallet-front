import s from "./transaction.module.scss";
import sendIcon from "../../../assets/images/send-Icon.svg";
import reciveIcon from "../../../assets/images/recive-icon.svg";
import moment from "moment/moment";

const Transaction = ({
  selectedWalletAdress,
  amount,
  reciver,
  sender,
  date,
}) => {
  const formatedAmount = Number(amount).toFixed(6);
  const handleDirectionStringFormat = (adress) => {
    let formatedAdress = adress.split("");
    formatedAdress.splice(15, 45, "...");

    return formatedAdress;
  };

  return (
    <li className={s.transaction}>
      {selectedWalletAdress === reciver ? (
        <img className={s.image} src={reciveIcon} alt="recive" />
      ) : (
        <img className={s.image} src={sendIcon} alt="send" />
      )}
      <ul className={s.transactionInfoList}>
        <li className={s.transactionInfoListItem}>
          <p className={s.transactionInfo}>Amount:</p>
          <p className={s.transactionInfo}>{formatedAmount}</p>
        </li>
        <li className={s.transactionInfoListItem}>
          {selectedWalletAdress === reciver ? (
            <>
              <p className={s.transactionInfo}>From: </p>
              <p className={s.transactionInfo}>
                {handleDirectionStringFormat(sender).join("")}
              </p>
            </>
          ) : (
            <>
              <p className={s.transactionInfo}>To: </p>
              <p className={s.transactionInfo}>
                {handleDirectionStringFormat(reciver).join("")}
              </p>
            </>
          )}
        </li>
        <li className={s.transactionInfoListItem}>
          <p className={s.date}>
            {moment.unix(date).format("MMMM Do YYYY, h:mm a")}
          </p>
        </li>
      </ul>
    </li>
  );
};

export default Transaction;
