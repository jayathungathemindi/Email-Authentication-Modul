import React, { useState, useEffect } from "react";
import { Button, Modal, message } from "antd";
import AddNote from "./AddNote";
import UpdateNote from "./UpdateNote";
import { EditOutlined, DeleteTwoTone } from "@ant-design/icons";
import axios from "axios";
import "./Note.css";

function NoteList() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Note, SetNote] = useState([]);
  const [isEdit, setEditStatus] = useState(false);
  const [editNote, setEdit] = useState({
    id: "",
    title: "",
    decription: "",
  });
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setEditStatus(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditStatus(false);
  };
  const success = () => {
    message.success("Delete note success");
  };
  const error = () => {
    message.error("Delete note faild");
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/noteList`).then((res) => {
      SetNote(res.data.notes);
    });
  }, []);
  const noteDelete = (id) => {
    axios.delete(`http://localhost:8000/noteList/${id}`).then(
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
        message.error("Delete note faild");
      }
    );
  };
  const noteEdit = (id, title, decription) => {
    setEdit({ ...editNote, id: id, title: title, decription: decription });
    setEditStatus(true);
    showModal();
  };
  return (
    <>
      <Button type="primary" onClick={showModal} className="addNote">
        Add Note
      </Button>
      <Modal
        title="Note"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {isEdit ? <UpdateNote editNote={editNote} /> : <AddNote />}
      </Modal>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Decription </th>
          </tr>
        </thead>
        <tbody>
          {Note.length == 0 ? <h3>Note not availble</h3> : null}
          {Note?.map((note, index) => {
            return (
              <>
                <tr>
                  {" "}
                  <th scope="row">{index + 1}</th>
                  <td>{note.title}</td>
                  <td>{note.decription}</td>
                  <td>
                    <button
                      className="btn btn-light"
                      onClick={() => {
                        noteEdit(note._id, note.title, note.decription);
                      }}
                    >
                      <EditOutlined />
                    </button>
                    <button
                      className="btn btn-light"
                      onClick={() => {
                        noteDelete(note._id);
                      }}
                    >
                      <DeleteTwoTone />
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default NoteList;
