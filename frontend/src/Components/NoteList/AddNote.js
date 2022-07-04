import * as React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { message } from "antd";

const AddNote = () => {
  const initialValues = {
    title: "",
    decription: "",
  };

  const success = () => {
    message.success("Add note success");
  };
  const error = () => {
    message.error("Add note faild");
  };

  const handleAddUser = (FormValues) => {
    axios.post("http://localhost:8000/addNote", FormValues).then(
      (response) => {
        if (response.status == 200) {
          success();
          window.location = `/NoteList`;
        } else {
          error();
        }
      },
      (error) => {
        console.log(error);
        message.error("Add note faild");
      }
    );
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleAddUser}>
        <div>
          <div>
            <Form>
              <div>
                <div>
                  {" "}
                  <label htmlFor="title">Title</label>
                </div>
                <div>
                  {" "}
                  <Field
                    name="title"
                    type="text"
                    className="input"
                    placeholder="title"
                  />
                </div>
                <div>
                  {" "}
                  <ErrorMessage
                    component="div"
                    name="title"
                    className="error"
                  />
                </div>
              </div>
              <div>
                <div>
                  {" "}
                  <label htmlFor="decription">Description</label>
                </div>
                <div>
                  {" "}
                  <Field
                    as="textarea"
                    name="decription"
                    placeholder="Decription"
                    className="input"
                  ></Field>
                </div>
                <div>
                  {" "}
                  <ErrorMessage
                    component="div"
                    name="decription"
                    className="error"
                  />
                </div>
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
export default AddNote;
