import "./App.css";
import "antd/dist/antd.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import SignUp from "./Components/SignUp/SignUp";
import SignIn from "./Components/SignIn/SignIn";
import UserList from "./Components/UserList/UserList";
import NoteList from "./Components/NoteList/NoteList";
import RequireAuth from "./Components/RequireAuth";
import Unauthorized from "./Components/Unauthorized";
import StudentHome from "./Components/Home/StudentHome";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/SignUp/:id" element={<SignUp />}></Route>
        <Route path="/SignIn" element={<SignIn />}></Route>
        <Route path="/unauthorized" element={<Unauthorized />}></Route>

        <Route element={<RequireAuth allowedRole={"admin"} />}>
          {" "}
          <Route path="/" element={<Home />}></Route>
          <Route path="/UserList" element={<UserList />}></Route>
        </Route>
        <Route element={<RequireAuth allowedRole={"student"} />}>
          {" "}
          <Route path="/StudentHome" element={<StudentHome />}></Route>
          <Route path="/NoteList" element={<NoteList />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
