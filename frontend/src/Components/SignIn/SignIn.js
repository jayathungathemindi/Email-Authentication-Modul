import React, { useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./SignIn.css";
import axios from "axios";
import { message } from "antd";
const SignIn = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });
  const success = () => {
    message.success("Loggin success");
  };
  const error = () => {
    message.error("Loggin faild");
  };

  const handleLogin = (formValue) => {
    axios.post("http://localhost:8000/login", formValue).then(
      (response) => {
        console.log(response);
        if (response.status == 200) {
          success();
          localStorage.setItem("userId", response.data.user._id);
          localStorage.setItem("accountType", response.data.user.accountType);
          localStorage.setItem("name", response.data.user.firstName);

          if (response.data.user.status) {
            if (response.data.user.accountType == "admin") {
              window.location = `/`;
            } else {
              window.location = `/StudentHome`;
            }
          } else {
            window.location = `/SignUp/${response.data.user._id}`;
          }
        } else {
          error();
        }
      },
      (error) => {
        console.log(error);
        message.error("Loggin faild");
      }
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {(formik) => {
        return (
          <Form className="row ">
            <div className=" Login_body">
              <div className="Login_content">
                <div className="Login_titile">
                  {" "}
                  <h1 className="my-4 font-weight-bold .display-4 ">Log In</h1>
                  <h4 className="my-4 font-weight-bold .display-4 text">
                    login here using your email and password
                  </h4>
                </div>
                <div>
                  <Field
                    type="email"
                    name="email"
                    label="Email"
                    className="Login_input"
                    placeholder="   Email"
                  />
                </div>
                <br />
                <div>
                  <Field
                    type="password"
                    name="password"
                    label="Password"
                    className="Login_input"
                    placeholder="Password"
                  />
                </div>
                <br />
                <button
                  type="submit"
                  disabled={!formik.isValid}
                  className="btn_Login"
                >
                  Log In
                </button>
                <br />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignIn;
