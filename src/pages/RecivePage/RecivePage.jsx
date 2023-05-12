import s from "./recivePage.module.scss";
import { Formik, Field, Form } from "formik";
import { useNavigate, Link, useParams } from "react-router-dom";
import { HandySvg } from "handy-svg";
import homeIcon from "../../assets/images/home.svg";
import arrowLeftIcon from "../../assets/images/arrow-left.svg";
import QRCode from "react-qr-code";

import { getAllWallets } from "../../redux/wallets/wallets-selectors";
import { useSelector } from "react-redux";

const ReciveModal = ({ open, handleClose }) => {
  const wallets = useSelector(getAllWallets);
  const params = useParams();
  const wallet = wallets.find((el) => {
    return el._id === params.id;
  });
  const navigate = useNavigate();
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
              adress: wallet?.walletAdress,
            }}
            onSubmit={(values) => {
              navigator.clipboard.writeText(values.adress);
            }}
          >
            <Form autoComplete="off" className={s.form}>
              <QRCode
                size={256}
                level={"L"}
                className={s.formImg}
                width="277px"
                value={wallet?.walletAdress}
              />
              <label className={s.formFieldLabel} htmlFor="adress"></label>
              <Field
                autoComplete="off"
                className={s.formField}
                id="adress"
                name="adress"
                placeholder="Adress"
                type="text"
              />
              <button className={s["formButton--top"]} type="submit">
                COPY
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ReciveModal;
