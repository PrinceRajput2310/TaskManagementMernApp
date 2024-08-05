import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../components/Home";
import AdminPage from "../components/AdminPage";
import Analytics from "../components/Analytics";
import Profile from "../components/Profile";
import withAuth from "../hoc/auth";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" Component={Signup} />
        <Route path="/login" Component={Login} />
        <Route path="/admin" Component={withAuth(AdminPage)} />
        <Route path="/analytics" Component={withAuth(Analytics)} />
        <Route path="/profile" Component={withAuth(Profile)} />
        <Route path="/home" Component={withAuth(Home)} />
      </Routes>
    </>
  );
};

export default AllRoutes;
