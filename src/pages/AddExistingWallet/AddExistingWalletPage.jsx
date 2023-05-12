import { useNavigate, Link } from "react-router-dom";
import s from "./addExistingWalletPage.module.scss";
import { Formik, Field, Form } from "formik";
// import Box from "@mui/material/Box";
import { HandySvg } from "handy-svg";
import homeIcon from "../../assets/images/home.svg";
import arrowLeftIcon from "../../assets/images/arrow-left.svg";
import Notiflix from "notiflix";

import { addWallet } from "../../redux/wallets/wallets-operations";
// import { getUserPaypass } from "../../redux/auth/auth-selectors";
import { useDispatch } from "react-redux";
// import { AES } from "crypto-js";
// import { Crypto } from "../../modules/Nature/utils";
const style = {
  // marginTop: "30vh",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const AddExistingWalletPage = () => {
  // const userPaypass = useSelector(getUserPaypass);
  const dispath = useDispatch();
  const navigate = useNavigate();
  return (
    <div className={s.section}>
      <div className={s.modalWrapper} sx={style}>
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
              mnemonic: "",
              walletAdress: "",
            }}
            onSubmit={(data) => {
              // console.log(data);
              dispath(
                addWallet({
                  mnemonic: data.mnemonic,
                })
              ).then((data) => {
                localStorage.removeItem("mnemonic");
                if (data.payload.name === "AxiosError") {
                  Notiflix.Notify.failure("Wrong Mnemonic");
                } else {
                  navigate("/");
                }
              });
            }}
          >
            <Form className={s.form}>
              <label className={s.formFieldLabel} htmlFor="mnemonic">
                MNEMONIC
              </label>

              <p className={s.formFieldCapth}>
                If you already possess wallet`s information, please type
                mnemonic and go ahead with "ADD WALLET" button.
                <br /> <br /> To gain access to a new wallet go ahead with "NEW
                WALLET" button.
              </p>
              <Field
                className={s["textarea"]}
                // disabled={true}
                id="mnemonic"
                name="mnemonic"
                placeholder=""
                component="textarea"
              />
              <button className={s["formButton--top"]} type="submit">
                ADD WALLET
              </button>
              <Link to="/new-wallet" className={s["formButton--bottom"]}>
                NEW WALLET
              </Link>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddExistingWalletPage;
