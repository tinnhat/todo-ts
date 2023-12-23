import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate, useSearchParams } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import Error from "./pages/error";
import Login from "./pages/login";
import Post from "./pages/post";
import Profile from "./pages/profile";
import Todo from "./pages/todo";
import { get_info_user } from "./redux/actions/user";
import PrivateRoute from "./utils/privateRoute";
const loggedInUser = localStorage.getItem("user");
function App() {
  const [userLogged, setUserLogged] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      dispatch(get_info_user(foundUser._id));
      setUserLogged(foundUser);
      // console.log("login");
    }
  }, []);

  return (
    <main>
      <Header />

      <Routes>
        <Route path="/" element={<Login user={userLogged} />} />

        <Route element={<PrivateRoute />}>
          <Route path="/todo" element={<Todo />} />
          <Route path="/post" element={<Post />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
