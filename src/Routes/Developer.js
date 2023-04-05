import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {
  Chat,
  Community,
  Home,
  Login,
  Profile,
  SinlgeProject,
} from "../pages/Developer";

function Developer() {
  const isLogin = useSelector((state) => state.developerLogin.value);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/developer/">
          <Route path="login" element={<Login />} />
          <Route
            path="home"
            element={isLogin ? <Home /> : <Navigate to="/developer/login" />}
          />
          <Route
            path="profile"
            element={isLogin ? <Profile /> : <Navigate to="/developer/login" />}
          />
          <Route
            path="project"
            element={isLogin ? <SinlgeProject /> : <Navigate to="/developer/login" />}
          />
          <Route
            path="discussion"
            element={isLogin ? <Community /> : <Navigate to="/developer/login" />}
          />
          <Route
            path="Chat"
            element={isLogin ? <Chat /> : <Navigate to="/developer/login" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Developer;
