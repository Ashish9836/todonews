import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import V from "max-validator";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const loginObject = {
  username: "required|min:3|max:50|string|contains_all:@",
  password: "required|min:6|max:50|string",
};
function Login() {
  // Use the useState hook to create state variables for the username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // This function is called when the login button is clicked
  function handleLogin(event) {
    event.preventDefault();
    const result = V.validate({ username, password }, loginObject);

    if (!result.hasError) {
      axios
        .post(`http://localhost:5000/login`, { username, password })
        .then((response) => {
          const jwt = response.data.access_token;
          localStorage.setItem("jwt", jwt);
        
          if (localStorage.getItem("redirect")) {
            const redirectData = localStorage.getItem("redirect");
            localStorage.removeItem("redirect");
          
            navigate(`/${redirectData}`);
          } else {
            toast.success('Logged In!', {
              position: toast.POSITION.TOP_RIGHT
          });
            navigate("/profile");
          }
        })
        .catch((error) => {
          // console.log("login failed", error);
          toast.error("Login failed!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    } else {
      toast.error("Enter email and password in correct format!", {
        position: toast.POSITION.TOP_RIGHT,
      });

    }
  }

  return (
    <div style={{ padding: "7%" }}>
      <h3>Login</h3>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Button
          className="mt-1"
          variant="primary"
          type="submit"
          onClick={handleLogin}
        >
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
