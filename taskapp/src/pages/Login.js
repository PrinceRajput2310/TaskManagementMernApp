import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import cookie from "js-cookie";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { API_URL } from "../utils/apiEndPoints";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/v1/login`, {
        email,
        password,
      });
      const user = await response.data;
      const token = user.token;
      const userName = user.user.name;
      console.log(" user token", userName);
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", userName);
        cookie.set("token", token, { expires: 1, path: "/" });
        cookie.set("user", userName, {
          expires: 1,
          path: "/",
        });
        navigate("/home");
      } else {
        console.log("Email and password is invalid");
      }
    } catch (error) {
      console.log("Error during getting api call");
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
        <h2 style={{ textAlign: "center", alignItems: "center" }}>Login</h2>
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
        <Button variant="primary" type="submit" onClick={loginUser}>
          Login
        </Button>
        <div>
          if you don't have account?{" "}
          <Button type="button" onClick={() => navigate("/")}>
            Signup
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
