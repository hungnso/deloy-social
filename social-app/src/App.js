import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import CreatePost from "./Pages/CreatePost/CreatePost";
import PostDetail from "./Pages/PostDetail/PostDetail";
import AddFriends from "./Pages/AddFriends/AddFriends";
import UserDetail from "./Pages/UserDetail/UserDetail";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserInfo } from "./redux/userSlice";
import useAuth from "./hooks/useAuth";
import { useNavigate } from "react-router-dom";
import GuestPage from "./Pages/RulePage/GuestPage";
import PrivatePage from "./Pages/RulePage/PrivatePage";
import EditProfile from "./Pages/EditProfile/Editprofile";
import socketClient from "./socket";
import LoadingPage from "./Components/Loading/LoadingPage";
import ErrorPage from "./Components/Loading/NotFoundPage";
import EditPost from "./Pages/EditPost/EditPost";
import Skeleton from "./Components/Loading/Skeleton";

function App() {
  const status = useSelector((state) => state.user.status);
  const user = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    socketClient.emit("join-user", user);
  }, [user]);
  React.useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  if (status === "idle" || status === "loading") return <LoadingPage />;
  if (status === "error") return <ErrorPage />;

  return (
    <Routes>
      <Route element={<GuestPage />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<PrivatePage />}>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
        <Route path="/friends" element={<AddFriends />} />
        <Route path="/user/:userId" element={<UserDetail />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/edit-post/:postId" element={<EditPost />} />
        <Route path="/test" element={<Skeleton />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
