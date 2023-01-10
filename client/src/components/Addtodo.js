import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import V from "max-validator";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const addObject = {
  title: "required|min:3|max:50|string|",
  description: "required|min:6|max:80|string",
};
function Addtodo({todoUpdater}) {
  // Use the useState hook to create state variables for the username and password
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  // This function is called when the login button is clicked
  function handleadd(event) {
    event.preventDefault();
    const result = V.validate({ title, description }, addObject);

    if (!result.hasError) {
      if (!localStorage.getItem("jwt")) return;
      const jwt = localStorage.getItem("jwt");
      axios
        .get("http://localhost:5000/user/getuser", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((user) => {
          const tosend = JSON.stringify({
            title,
            description,
            userId: user.data.id,
            isDone: false,
          });

          axios
            .post("http://localhost:5000/todo", tosend, {
              headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
              toast.success("todo added successfully!", {
                position: toast.POSITION.TOP_RIGHT,
              });
            todoUpdater();
            setTitle("");
            setDescription("");
              
            })
            .catch((error) => {
              toast.error("something went error!", {
                position: toast.POSITION.TOP_RIGHT,
              });
              navigate("/login");
            });
        })
        .catch((error) => {
          toast.error("something went error!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          navigate("/login");
        });

      //   -------
    } else {
      toast.error("title and description is not proper!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  return (
    <div style={{ padding: "7%" }}>
      <h3>Add your todo here</h3>
      <Form>
        <Form.Group controlId="formTitle">
          <Form.Label>title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title's title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Group>
        <Button className="mt-1" variant="primary" onClick={handleadd}>
          Add this Todo
        </Button>
      </Form>
    </div>
  );
}

export default Addtodo;
