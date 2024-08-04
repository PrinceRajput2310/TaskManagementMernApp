import React from "react";
import { Navigate } from "react-router-dom";
// import Cookies from "js-cookie";

const withAuth = (Component) => {
  return (props) => {
    // const token = Cookies.get('token');
    const token = localStorage.getItem("token");

    if (token) {
      // If the token exists, render the passed component
      return <Component {...props} />;
    } else {
      // If the token does not exist, redirect to the login page
      return <Navigate to="/" />;
    }
  };
};

export default withAuth;
