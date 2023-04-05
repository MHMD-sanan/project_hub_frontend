import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AdminHome,
  Developers,
  Login,
  Projects,
  AddNewProject,
  ViewSingleProject,
  AddDeveloper,
} from "../pages/Admin";

function AdminRoute() {
  const isAdminLogin = useSelector((state) => state.adminLogin.value);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/">
          <Route path="login" element={<Login />} />
          <Route
            path="home"
            element={
              isAdminLogin ? <AdminHome /> : <Navigate to="/admin/login" />
            }
          />
          <Route
            path="developers"
            element={
              isAdminLogin ? <Developers /> : <Navigate to="/admin/login" />
            }
          />
          <Route
            path="projects"
            element={
              isAdminLogin ? <Projects /> : <Navigate to="/admin/login" />
            }
          />
          <Route
            path="add_new_project"
            element={
              isAdminLogin ? <AddNewProject /> : <Navigate to="/admin/login" />
            }
          />
          <Route
            path="view_project"
            element={
              isAdminLogin ? (
                <ViewSingleProject />
              ) : (
                <Navigate to="/admin/login" />
              )
            }
          />
          <Route
            path="add_developer"
            element={
              isAdminLogin ? <AddDeveloper /> : <Navigate to="/admin/login" />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AdminRoute;
