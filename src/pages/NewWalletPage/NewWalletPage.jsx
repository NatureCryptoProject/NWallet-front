import s from "./newWalletPage.module.scss";
import { Formik, Field, Form } from "formik";
import { useNavigate, Link } from "react-router-dom";

import { HandySvg } from "handy-svg";
import homeIcon from "../../assets/images/home.svg";
import arrowLeftIcon from "../../assets/images/arrow-left.svg";
import { Buffer } from "buffer";
const { Crypto } = require("../../modules/Nature/utils");
// import { sha512, sha512_256 } from "js-sha512";
// const style = {
//   // marginTop: "30vh",
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
// };

const NewWalletModal = () => {
  window.Buffer = window.Buffer || Buffer;
  const genMnemonic = Crypto.generateMnemonic();
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
              mnemonic: genMnemonic,
            }}
            onSubmit={(data, actions) => {
              actions.setSubmitting(false);
              navigator.clipboard.writeText(data.mnemonic);
            }}
          >
            <Form className={s.form}>
              <label className={s.formFieldLabel} htmlFor="mnemonic">
                MNEMONIC
              </label>

              <p className={s.formFieldCapth}>
                Memorize the below given mnemonic, this information is needed to
                access wallet
                {/* <br /> <br /> To gain access to a new wallet go ahead with "NEW
                WALLET" button. */}
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
                COPY
              </button>
              <Link
                onClick={localStorage.setItem("mnemonic", genMnemonic)}
                to="/add-wallet"
                className={s["formButton--bottom"]}
              >
                REMEMBERED
              </Link>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default NewWalletModal;
