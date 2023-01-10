import alanBtn from "@alan-ai/alan-sdk-web";
import { useCallback, useEffect, useState } from "react";
import V from "max-validator";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const addObject = {
  title: "required|min:3|max:30|string|",
  description: "required|min:6|max:60|string",
};

const COMMANDS = {
  DELETE_TODO: "delete-todo",
  SAY_TODO: "say-todos",
  SAY_NEWS: "say-news",
  TODO_CREATED: "todo-created",
};
const useAlan = (value) => {
  const [alanInstance, setAlanInstance] = useState(null);
  const navigate = useNavigate();

  const createTodo = useCallback(
    async (para) => {
      const { title, description } = para.detail;
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
                window.location.reload();
              })
              .catch((error) => {
                toast.error("todo addition failed!", {
                  position: toast.POSITION.TOP_RIGHT,
                });

                navigate("/login");
              });
          })
          .catch((error) => {
            toast.success("todo added failed!", {
              position: toast.POSITION.TOP_RIGHT,
            });
            navigate("/login");
          });

        //   -------
      } else {
        toast.error("todo title and detail is not in proper format!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    },
    [alanInstance, value]
  );

  const deleteTodo = useCallback(() => {
    alanInstance.playText("Okay delete todo wait");
  }, [alanInstance]);

  const sayTodo = useCallback(() => {
    if (!value) {
      alanInstance.playText("no todo! just relax");
      return;
    }
    if (!value.todos || value.todos.length == 0) {
      alanInstance.playText("no todo! just relax");
    } else {
      for (let index = 0; index < value.todos.length; index++) {
        alanInstance.playText(`now telling about todo number ${index + 1}`);
        alanInstance.playText(`your todo title is ${value.todos[index].title}`);
        alanInstance.playText(
          `your todo description is ${value.todos[index].description}`
        );
        if (index == value.todos.length - 1)
          alanInstance.playText(`That's all for today! have a nice day`);
      }
    }
  }, [alanInstance, value]);

  const sayNews = useCallback(() => {
    if (!value || value.length == 0) {
      alanInstance.playText("no news for today! just relax");
    } else {
      for (let index = 0; index < value.length; index++) {
        alanInstance.playText(`now telling about news number ${index + 1}`);
        alanInstance.playText(`your news title is ${value[index].title}`);
        alanInstance.playText(
          `your description description is ${value[index].description}`
        );
        if (index == value.length - 1)
          alanInstance.playText(
            `That's all from breaking news! and have a nice day`
          );
      }
    }
  }, [alanInstance, value]);

  useEffect(() => {
    window.addEventListener(COMMANDS.TODO_CREATED, createTodo);
    window.addEventListener(COMMANDS.DELETE_TODO, deleteTodo);
    window.addEventListener(COMMANDS.SAY_TODO, sayTodo);
    window.addEventListener(COMMANDS.SAY_NEWS, sayNews);
    return () => {
      window.removeEventListener(COMMANDS.TODO_CREATED, createTodo);
      window.removeEventListener(COMMANDS.DELETE_TODO, deleteTodo);
      window.removeEventListener(COMMANDS.SAY_TODO, sayTodo);
      window.removeEventListener(COMMANDS.SAY_NEWS, sayNews);
    };
  }, [createTodo, deleteTodo, sayTodo, sayNews]);

  useEffect(() => {
    if (alanInstance != null) return;
    setAlanInstance(() =>
      alanBtn({
        left: "90%",
        top: "85%",
        key: `${process.env.REACT_APP_ALAN}/stage`,
        onCommand: ({ command, payload }) => {
          window.dispatchEvent(new CustomEvent(command, { detail: payload }));
        },
      })
    );
  }, []);

  return null;
};
export default useAlan;
