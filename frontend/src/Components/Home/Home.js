import { useState } from "react";
import { Button, Modal } from "antd";
import "./Home.css";
import AddUser from "../AddUser/AddUser";

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="container-fluid welcome p-0">
      <nav className="welcome-nav">
        <p>my intern first work</p>
      </nav>
      <header>
        <div className="row ">
          <div className="row">
            <ul className="nav-info">
              <li className="logo">
                <img className="logo-img" src="/images/S.png"></img>urge Globle
              </li>

              <>
                <li className="quote">
                  Have a nice day ! {localStorage.getItem("name")}
                </li>
                <li>
                  <a href="/UserList" className="btn signin">
                    UserList
                  </a>
                </li>
              </>
            </ul>
          </div>
          <hr />
          <div className="col-sm-6 mid-text">
            <p>
              Build your brand, expand your footprint and understand the quick
              wins as well as the longer term plan. Surge’s offerings have been
              designed to cater to both those starting from the very beginning
              and the more experienced brands looking for new ways to grow their
              business.
            </p>
          </div>
          <div>
            <div className="arrow arrow-first"></div>
            <div className="arrow arrow-second"></div>
          </div>
          <div className="register">
            <Button type="primary" onClick={showModal} className="signup">
              Add User
            </Button>
            <Modal
              title="Add User"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
            >
              <AddUser />
            </Modal>
          </div>
        </div>
      </header>

      <div className="footer">
        <ul className="list-group footer-text">
          <li>&copy; Copyright 2022 </li>
        </ul>
      </div>
    </div>
  );
};
export default Home;
