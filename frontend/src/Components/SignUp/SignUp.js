import * as React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./SignUp.css";
import axios from "axios";
import { SignUpRepository } from "../../Repository/SignUpRepository";
import { message } from "antd";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
const SignUp = () => {
  const { id } = useParams();
  const initialValues = {
    firstName: "",
    lastName: "",

    mobile: 0,
    dateOfBirth: "",

    password: "",
    confirm_password: "",
  };
  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
  });
  const success = () => {
    message.success("User update success");
  };
  const error = () => {
    message.error("USer update faild");
  };

  const handleRegister = (FormValues) => {
    const SignUpData = SignUpRepository(FormValues, id);

    axios.post("http://localhost:8000/editUserProfile", SignUpData).then(
      (response) => {
        if (response.status == 200) {
          success();
          Swal.fire({
            title: "User update success",
            type: "success",
            text: "Sucessfully user updated.",
            confirmButtonColor: "#3bb19b",
            timer: 8500,
          });
          window.location = `/SignIn`;
        } else {
          error();
        }
      },
      (error) => {
        message.error("USer update faild");
        console.log(error);
      }
    );
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validate}
        onSubmit={handleRegister}
      >
        <div className="SignUP_content">
          <div className="SignUP_titile">
            {" "}
            <h1 className="my-4 font-weight-bold .display-4 ">Sign Up</h1>
          </div>

          <div>
            <Form>
              <div>
                {" "}
                <div>
                  {" "}
                  <label htmlFor="firstName">First Name</label>
                </div>
                <div>
                  <Field name="firstName" type="text" className="input" />
                </div>
                <div>
                  {" "}
                  <ErrorMessage
                    component="div"
                    name="firstName"
                    className="error"
                  />
                </div>
              </div>
              <div>
                {" "}
                <div>
                  {" "}
                  <label htmlFor="lastName">Last Name</label>
                </div>
                <div>
                  <Field name="lastName" type="text" className="input" />
                </div>
                <div>
                  {" "}
                  <ErrorMessage
                    component="div"
                    name="lastName"
                    className="error"
                  />
                </div>
              </div>

              <div>
                <div>
                  {" "}
                  <label htmlFor="mobile">Mobile Number</label>
                </div>
                <div>
                  {" "}
                  <Field name="mobile" type="text" className="input" />
                </div>
                <div>
                  {" "}
                  <ErrorMessage
                    component="div"
                    name="mobile"
                    className="error"
                  />
                </div>
              </div>
              <div>
                {" "}
                <div>
                  {" "}
                  <label htmlFor="password">Password</label>
                </div>
                <div>
                  {" "}
                  <Field name="password" type="password" className="input" />
                </div>
                <div>
                  {" "}
                  <ErrorMessage
                    component="div"
                    name="password"
                    className="error"
                  />
                </div>
              </div>
              <div>
                {" "}
                <div>
                  {" "}
                  <label htmlFor="confirm_password">Confirm password</label>
                </div>
                <div>
                  <Field
                    name="confirm_password"
                    type="password"
                    className="input"
                  />
                </div>
                <div>
                  {" "}
                  <ErrorMessage
                    component="div"
                    name="confirm_password"
                    className="error"
                  />
                </div>
              </div>
              <div>
                <div>
                  {" "}
                  <label htmlFor="dateOfBirth">Date Of Birth</label>
                </div>
                <div>
                  {" "}
                  <Field name="dateOfBirth" type="date" className="input" />
                </div>
                <div>
                  {" "}
                  <ErrorMessage
                    component="div"
                    name="dateOfBirth"
                    className="error"
                  />
                </div>
              </div>

              <div>
                {" "}
                <button type="submit" className="btn btn-light">
                  Submit
                </button>
              </div>
            </Form>
          </div>
        </div>
      </Formik>
    </div>
  );
};
export default SignUp;
