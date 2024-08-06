import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { userSignupRequest } from "../redux/reduxSlice/userSlice";
import { FaArrowLeft } from "react-icons/fa";
import logo from "../assets/notebook.svg";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    dispatch(userSignupRequest({ name, email, password }));
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
        <h2 style={{ textAlign: "center", alignItems: "center" }}>Signup</h2>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Enter Name</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
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
          onClick={registerUser}
          style={{ width: "100%", color: "white" }}
        >
          Create account
        </Button>
        <div style={{ marginTop: "10px" }}>
          Already have an account?{" "}
          <Button
            type="button"
            variant="success"
            color=""
            onClick={() => navigate("/login")}
            style={{ backgroundColor: "rgb(66, 153, 225);" }}
          >
            <FaArrowLeft size={15} /> Back to login
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Signup;
