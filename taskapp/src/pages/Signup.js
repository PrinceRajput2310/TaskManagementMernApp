import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import cookie from "js-cookie";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { API_URL } from "../utils/apiEndPoints";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/v1/signup`, {
        name,
        email,
        password,
      });
      const user = await response.data;
      const token = user.token;
      if (!token) {
        console.log("Error during Signup , please fill all fields");
      } else {
        localStorage.setItem("token", token);
        cookie.set("token", token, { expires: 2, path: "/" });
        cookie.set("userId", user._id, { expires: 2, path: "/" });
        navigate("/home");
        console.log("User Registerd Successfully", token);
      }
    } catch (error) {
      console.log("Error calling api");
    }
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
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
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
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={registerUser}>
          Signup
        </Button>
        <div>
          if you don't have account?{" "}
          <Button type="button" onClick={() => navigate("/login")}>
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Signup;
