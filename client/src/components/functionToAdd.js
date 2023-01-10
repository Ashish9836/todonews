import axios from "axios";
const addObject = {
    title: "required|min:3|max:30|string|",
    description: "required|min:6|max:60|string",
  };
export default function handleadd() {
 
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
      toast.error("please provide proper title and description!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }