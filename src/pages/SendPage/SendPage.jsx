import s from "./sendPage.module.scss";
import { Formik, Field, Form } from "formik";
import { useNavigate, Link, useParams } from "react-router-dom";
import { HandySvg } from "handy-svg";
import homeIcon from "../../assets/images/home.svg";
import arrowLeftIcon from "../../assets/images/arrow-left.svg";
// import qrIcon from "../../assets/images/QR-icon.png";
import { sendTransaction } from "../../redux/wallets/wallets-operations";
import { useDispatch } from "react-redux";
import Notiflix from "notiflix";

const SendPage = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const params = useParams();
  return (
    <div className={s.section}>
      <div className={s.modalWrapper}>
        <button onClick={() => navigate(-1)} className={s.arrowLeftIcon}>
          <HandySvg
            className={s.svg}
            src={arrowLeftIcon}
            width="45"
            height="45"
          />
        </button>
        <Link to="/" className={s.homeIcon}>
          <HandySvg className={s.svg} src={homeIcon} width="45" height="45" />
        </Link>
        <div className={s.formWrapper}>
          <Formik
            initialValues={{
              adress: "",
              amount: "",
            }}
            onSubmit={(data) => {
              if (data.adress === "") {
                Notiflix.Notify.failure("Adress field is empty");
                return;
              } else if (data.amount === "") {
                Notiflix.Notify.failure("Amount field is empty");
                return;
              } else if (/^[0-9]+$/.test(data.amount)) {
                dispath(
                  sendTransaction({
                    senderPublicKey: params.id,
                    transactionAdress: data.adress,
                    transactionAmount: Number(data.amount),
                  })
                ).then((data) => {
                  if (data.payload === "Rejected Invalid address format!") {
                    Notiflix.Notify.failure("Rejected Invalid address format!");
                    return;
                  } else if (data.payload === "Rejected Insufficient funds") {
                    Notiflix.Notify.failure("Rejected Insufficient funds");
                    return;
                  }
                  navigate("/");
                });
              } else {
                Notiflix.Notify.failure("Something went wrong");
              }
            }}
          >
            <Form autoComplete="off" className={s.form}>
              <label className={s.formFieldLabel} htmlFor="adress">
                <button
                  type="button"
                  onClick={() => {
                    navigate("/scaner");
                  }}
                  className={s.scannerButton}
                >
                  {/* <img
                    className={s.formFieldImg}
                    width="45px"
                    src={qrIcon}
                    alt="qr code"
                  /> */}
                </button>
              </label>
              <Field
                autoComplete="off"
                className={s["formField"]}
                id="adress"
                name="adress"
                placeholder="Recive address"
                type="text"
              />
              <label className={s.formFieldLabel} htmlFor="amount"></label>
              <Field
                autoComplete="off"
                className={s.formField}
                id="amount"
                name="amount"
                placeholder="Amount"
                type="text"
              />
              <p className={s.formInfo}>Total with fee: 0 NATURE</p>
              <button className={s["formButton--top"]} type="submit">
                SEND
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SendPage;
