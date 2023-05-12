import { useNavigate, Link } from "react-router-dom";
import s from "./registerPage.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  useDispatch,
  // useSelector
} from "react-redux";
import { signup } from "../../redux/auth/auth-operations";
// import { getUser } from "../../redux/auth/auth-selectors";

const RegisterPage = () => {
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    userName: Yup.string().trim().max(40).required(),
    password: Yup.string()
      .trim()
      .min(8)
      .max(20)
      .matches(/[0-9a-zA-Z]{8,}/g)
      .required(),
  });

  const dispatch = useDispatch();
  // const user = useSelector(getUser);

  return (
    <section className={s.section}>
      <div className={s.modalWrapper}>
        <Formik
          initialValues={{ userName: "", password: "" }}
          validationSchema={schema}
          onSubmit={({ userName, password }) => {
            dispatch(signup({ userName: userName, password: password }));
            navigate("/");
          }}
        >
          <Form autoComplete="off" className={s.form}>
            {/* <h1>Please Register</h1> */}

            <label className={s.formFieldLabel} htmlFor="email">
              User Name *
            </label>
            <Field
              className={s.formField}
              id="userName"
              name="userName"
              type="text"
              autoComplete="off"
            />
            <ErrorMessage
              name="userName"
              render={() => <p className={s.errorMessage}>userName required</p>}
            />
            <label className={s.formFieldLabel} htmlFor="password">
              Password *
            </label>
            <Field
              className={s.formField}
              id="password"
              name="password"
              type="password"
              autoComplete="off"
            />
            <ErrorMessage
              name="password"
              render={() => (
                <p className={s.errorMessagePassword}>
                  Password required, use only 0-9, a-z, A-Z chars, min 8 max 20
                </p>
              )}
            />
            <p className={s.userInform}>
              Please note that we dont use any of your personal data, therefore
              make sure you remember your user name and password accurately,
              there will be no way to restore that data
            </p>
            <button className={s["formButton--top"]} type="submit">
              REGISTER
            </button>
            {/* <Link className={s["formButton--bottom-start"]} to="/login">
              LOGIN
            </Link> */}
            <Link to="/login" className={s.alternativeLink}>
              I already have an account
            </Link>
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default RegisterPage;
