import React, { useEffect, useState } from "react";
import axios from "axios";
import { EyeOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { Input, Space } from "antd";

function UserList() {
  const [User, SetUser] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleSearch, setIsModalVisibleSearch] = useState(false);
  const [UserId, SetUserId] = useState();
  const [searchUser, setSearchUser] = useState();
  const { Search } = Input;
  useEffect(() => {
    axios.get(`http://localhost:8000/userList`).then((res) => {
      SetUser(res.data.users);
    });
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showModalSearch = () => {
    setIsModalVisibleSearch(true);
  };

  const handleOkSearch = () => {
    setIsModalVisibleSearch(false);
  };

  const handleCancelSearch = () => {
    setIsModalVisibleSearch(false);
  };
  const onSearch = (value) => {
    const searchObject =
      User?.find((user) => user.firstName == value) ||
      User?.find((user) => user.email == value) ||
      User?.find((user) => user._id == value);
    setSearchUser(searchObject);
    showModalSearch();
  };

  return (
    <>
      <div>
        {" "}
        <Space direction="vertical">
          <Search
            placeholder="input search User"
            onSearch={onSearch}
            enterButton
            className="search"
          />
        </Space>
      </div>
      <div>
        <Modal
          title="User Found"
          visible={isModalVisibleSearch}
          onOk={handleOkSearch}
          onCancel={handleCancelSearch}
        >
          <ul class="list-group">
            <li class="list-group-item">{searchUser?.firstName}</li>
            <li class="list-group-item">{searchUser?.lastName}</li>
            <li class="list-group-item">{searchUser?.email}</li>
          </ul>
        </Modal>
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Index</th>
            <th scope="col">First Name</th>
            <th scope="col">Email </th>
            <th scope="col">Account Type</th>
          </tr>
        </thead>
        <tbody>
          {User.length == 0 ? <h3>Uses not availble</h3> : null}
          {User?.map((user, index) => {
            if (user.status) {
              return (
                <>
                  <tr>
                    {" "}
                    <th scope="row">{index + 1}</th>
                    <td>{user.firstName}</td>
                    <td>{user.email}</td>
                    <td>{user.accountType}</td>
                    <td>
                      <button
                        className="btn btn-light"
                        onClick={() => {
                          SetUserId(index);
                          showModal();
                        }}
                      >
                        <EyeOutlined />
                      </button>
                    </td>
                  </tr>
                </>
              );
            }
          })}
        </tbody>
      </table>
      <Modal
        title="User Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <table class="table">
          <tbody>
            <tr>
              <td> First Name </td>
              <td>{User[UserId]?.firstName}</td>
            </tr>
            <tr>
              <td>Last Name </td>
              <td>{User[UserId]?.lastName}</td>
            </tr>
            <tr>
              <td>Email </td>
              <td> {User[UserId]?.email}</td>
            </tr>
            <tr>
              <td>Mobile No</td>
              <td>0{User[UserId]?.mobile}</td>
            </tr>
            <tr>
              <td> Birthday</td>
              <td>{User[UserId]?.dateOfBirth}</td>
            </tr>
          </tbody>
        </table>
      </Modal>
    </>
  );
}

export default UserList;
