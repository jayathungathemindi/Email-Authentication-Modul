import * as React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { message } from "antd";

const UpdateNote = (props) => {
  const success = () => {
    message.success("Update note success");
  };
  const error = () => {
    message.error("Update note faild");
  };

  const handleAddUser = (FormValues) => {
    axios.post("http://localhost:8000/editNote", FormValues).then(
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
        message.error("Update note faild");
      }
    );
  };

  return (
    <div>
      <Formik initialValues={props.editNote} onSubmit={handleAddUser}>
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
export default UpdateNote;
