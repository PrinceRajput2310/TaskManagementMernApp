import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { userLoginRequest } from "../redux/reduxSlice/userSlice";
import logo from "../assets/notebook.svg";
import { IoAddCircleOutline } from "react-icons/io5";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const loginUser = async (e) => {
    e.preventDefault();
    dispatch(userLoginRequest({ email, password }));
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "8%",
        boxShadow:
          "0px 20px 20px 0px rgba(0, 0, 0, .08), 0px 0px 2px 0px rgba(0, 0, 0, .12)",
        padding: "40px",
        maxWidth: "500px",
      }}
    >
      <Form>
        <div style={{ textAlign: "center" }}>
          <img src={logo} alt="logo" height={60} width={60} />{" "}
          <span style={{ fontFamily: "cursive", fontSize: "x-large" }}>
            Task Management
          </span>
        </div>
        <h2
          style={{
            textAlign: "center",
            alignItems: "center",
          }}
        >
          Login
        </h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button
          variant="info"
          type="submit"
          onClick={loginUser}
          style={{ width: "100%", color: "white" }}
        >
          Login
        </Button>

        <div style={{ marginTop: "10px" }}>
          if you don't have account?{" "}
          <Button type="button" onClick={() => navigate("/")} variant="success">
            <IoAddCircleOutline size={20} /> Create account
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
