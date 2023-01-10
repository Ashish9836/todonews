import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import V from "max-validator";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

const SignupObject = {
  name: "required|min:3|max:50|string",
  username: "required|min:3|max:50|string|contains_all:@",
  password: "required|min:6|max:50|string",
  phone_number: "required|min:10|max:10|string",
};
function Signup() {
  // Use the useState hook to create state variables for the username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const navigate = useNavigate();

  // This function is called when the Signup button is clicked
  function handleSignup(event) {
    event.preventDefault();
    const result = V.validate(
      { username, password, name, phone_number },
      SignupObject
    );
    if (!result.hasError) {
      axios
        .post("http://localhost:5000/user", {
          username,
          password,
          name,
          phone_number,
        })
        .then((response) => {
          const jwt = response.data.access_token;
          localStorage.setItem("jwt", jwt);
          toast.success("account created!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          navigate("/profile");

        })
        .catch((error) => {
          toast.error("signup failed!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    } else {
      toast.error("please provide valid details", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  return (
    <div style={{ padding: "7%" }}>
      <h3>Signup</h3>
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

        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPhone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            value={phone_number}
            onChange={(event) => setPhone_number(event.target.value)}
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
          onClick={handleSignup}
        >
          Signup
        </Button>
      </Form>
    </div>
  );
}

export default Signup;
