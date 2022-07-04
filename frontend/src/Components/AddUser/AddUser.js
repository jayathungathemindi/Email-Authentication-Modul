import * as React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import axios from "axios";

import { message } from "antd";

const AddUser = (props) => {
  const initialValues = {
    email: "",
    accountType: "",
  };
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
  });
  const success = () => {
    message.success("Add user success");
  };
  const error = () => {
    message.error("Add user faild");
  };
  const warning = () => {
    message.warning("This email is already used");
  };
  const handleAddUser = (FormValues) => {
    axios.post("http://localhost:8000/addUser", FormValues).then(
      (response) => {
        if (response.status == 200) {
          success();
          window.location = `/`;
        } else if (response.status == 202) {
          warning();
        } else {
          error();
        }
      },
      (error) => {
        console.log(error);
        message.error("Add user faild");
      }
    );
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validate}
        onSubmit={handleAddUser}
      >
        <div>
          <div>
            <Form>
              <div>
                <div>
                  {" "}
                  <label htmlFor="email">Email Address</label>
                </div>
                <div>
                  {" "}
                  <Field name="email" type="email" className="input" />
                </div>
                <div>
                  {" "}
                  <ErrorMessage
                    component="div"
                    name="email"
                    className="error"
                  />
                </div>
              </div>

              <div>
                <div>
                  {" "}
                  <label htmlFor="accountType"> Account Type</label>
                </div>
                <div>
                  {" "}
                  <Field
                    as="select"
                    name="accountType"
                    className="accountType input "
                  >
                    <option value="" selected disabled>
                      Select Account Type
                    </option>
                    <option value="admin">Admin</option>
                    <option value="student">Student</option>
                  </Field>
                </div>

                <br></br>
              </div>

              <div>
                {" "}
                <button type="submit" className="btn btn-info">
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
export default AddUser;
