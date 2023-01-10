import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
import Addtodo from "./Addtodo";
import useAlan from "../hooks/useAlan";

const Todo = () => {
 
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState("");
  const [userId,setUserId] = useState(undefined);
  const [hookPara,setHookPara] = useState({todos:todos,func:()=>{},useId:undefined});

  const todoUpdate = () => {
    const arrayUpdate = [...todos];
    setTodos(() => arrayUpdate);
  };

  

  const navigate = useNavigate();

  const updateProp = (cond, e, ids) => {
    if (cond) {
      const txt_div = e.target.innerText;
      const sendIt = { isDone: txt_div == "pending!" ? true : false };
    
      axios
        .patch(`http://localhost:5000/todo/${ids}`, sendIt, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then(() => {
          toast.success("todo updated!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          todoUpdate();
        })
        .catch((error) => {
          toast.error("updation failed!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          return;
        });
    } else {
      axios
        .delete(`http://localhost:5000/todo/${ids}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then(() => {
          toast.success("todo deleted!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          todoUpdate();
        })
        .catch((error) => {
          toast.error("todo deletion failed!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          return;
        });
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("jwt")) return;
    const jwt = localStorage.getItem("jwt");

    axios
      .get("http://localhost:5000/user/getuser", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        
         setName(()=>response.data.name)
         setUserId(()=>response.data.id)
         setHookPara(()=>({todos:todos,func:todoUpdate,userId:response.data.id}));
      })
      .catch((error) => {
        toast.error("something went wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/login");
      });

    axios
      .get("http://localhost:5000/todo/", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        const arrayResponse = response.data.data;
        const presentTodos = todos;
        if (JSON.stringify(arrayResponse) !== JSON.stringify(presentTodos)) {
          setTodos(() => arrayResponse);
          setHookPara(()=>({todos:arrayResponse,func:todoUpdate,userId:userId}));
        }
      })
      .catch((error) => {
        toast.error("todo fetching failed!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/login");
      });
  }, [todos]);

  useAlan(hookPara);
  return (
    <>
      {!todos.length ? (
        <h3>no todos found!</h3>
      ) : (
        <>
        <h5 style={{padding:"3px",color:"black"}}>Hi,<span style={{color:"red"}}>{name}</span></h5>
          {todos.map((todo) => (
            <MDBCard key={todo.id}>
              <MDBCardBody>
                <MDBCardTitle>{todo.title}</MDBCardTitle>
                <MDBCardText>{todo.description}</MDBCardText>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <div
                    style={{
                      color: todo.isDone ? "green" : "red",
                      cursor: "pointer",
                      border: `${todo.isDone ? "green" : "red"} 1px solid`,
                      padding: "2px",
                      borderRadius: "5px",
                    }}
                    onClick={(e) => updateProp(true, e, todo.id)}
                  >
                    {todo.isDone ? "done!" : "pending!"}
                  </div>
                  <div
                    style={{
                      color: "red",
                      cursor: "pointer",
                      border: "red 1px solid",
                      padding: "2px",
                      borderRadius: "5px",
                    }}
                    onClick={(e) => updateProp(false, e, todo.id)}
                  >
                    Delete
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          ))}
        </>
      )}
      <div></div>

      <Addtodo todoUpdater={todoUpdate} />
    </>
  );
};

export default Todo;
