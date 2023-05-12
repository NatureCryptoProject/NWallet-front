import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import s from "./loginPage.module.scss";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/auth-operations";

export default function LoginPage() {
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

  return (
    <section className={s.section}>
      <div className={s.modalWrapper}>
        <Formik
          initialValues={{ userName: "", password: "" }}
          validationSchema={schema}
          onSubmit={({ userName, password }) => {
            dispatch(login({ userName: userName, password: password }));
            navigate("/");
          }}
        >
          <Form autoComplete="off" className={s.form}>
            {/* <h1>Please Login</h1> */}
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
            <button className={s["formButton--top"]} type="submit">
              LOGIN
            </button>
            {/* <Link className={s["formButton--bottom-start"]} to="/register">
              REGISTER
            </Link> */}
            <Link to="/register" className={s.alternativeLink}>
              I don`t have an account yet
            </Link>
          </Form>
        </Formik>
      </div>
    </section>
  );
}
