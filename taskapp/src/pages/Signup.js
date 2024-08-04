import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { userSignupRequest } from "../redux/reduxSlice/userSlice";

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
        marginTop: "10%",
      }}
    >
      <Form>
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
        <Button variant="primary" type="submit" onClick={registerUser}>
          Signup
        </Button>
        <div>
          Already have an account?{" "}
          <Button type="button" onClick={() => navigate("/login")}>
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Signup;
