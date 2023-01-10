import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import useAlan from "../hooks/useAlan";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";

const News = () => {
  const [news, setNews] = useState([]);
  const [name, setName] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize,setPageSize] = useState(5);
  const [filter, setFilter] = useState({page,pageSize,country:"in"});
  const [allNews, setAllNews] = useState(true);
  const newsUpdate = () => {
    const arrayUpdate = [...news];
    setNews(() => arrayUpdate);
  };
  const navigate = useNavigate();

  useAlan(news)
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
        setName(() => response.data.name);
      })
      .catch((error) => {
        toast.error("something wents error,login first", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/login");
      });

      
    axios
      .post(
        "http://localhost:5000/breakingnews/",
        filter,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((response) => {
       
        const arrayResponse = response.data;
        const presentNews = news;
        if (JSON.stringify(arrayResponse) !== JSON.stringify(presentNews)) {
          setNews(() => arrayResponse);
        }
      })
      .catch((error) => {
        toast.error("something went error!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/login");
      });
  }, [filter]);

  const componentNewsPart = news.map((todo) => (
    <MDBCard key={todo.id} className="m-1">
      <MDBCardBody>
        <img
          src={todo.urlToImage}
          class="img-thumbnail"
          alt="Hollywood Sign on The Hill"
          style={{ width: "20%", height: "20%" }}
        />
        <MDBCardTitle>
          <span style={{ color: "#1f2937" }}>{todo.title}</span>
        </MDBCardTitle>
        <MDBCardText>
          <span style={{ color: "#64748b" }}>{todo.description}</span>
        </MDBCardText>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <div>
            <span style={{ color: "black", fontWeight: "400" }}>Source: </span>
            <span style={{ color: "red", fontWeight: "500" }}>
              {todo.source.name}
            </span>
          </div>
          <div>
            more details
            <a href={todo.url} target="_blank">
              (click here)
            </a>
          </div>
        </div>
      </MDBCardBody>
    </MDBCard>
  ));


  const handlePage = (value)=>{
    const newPage = page+value;
    if(newPage<1) newPage = 1;
    setPage(()=>newPage);
    setFilter(()=>({...filter,page:newPage}));



  }
  return (
    <>
      {!news.length ? (
        <h3>News fetching....</h3>
      ) : (
        <>
          <h5 style={{ padding: "3px", color: "black" }}>
            Hi,<span style={{ color: "red" }}>{name}! <span style={{color:"gray"}}>Breaking News for today!</span></span>
          </h5>

          {componentNewsPart}
          <div class="d-flex flex-row mb-3 justify-content-evenly">
            <div>
              <button type="button" class="btn btn-danger" onClick={()=>handlePage(-1)}>
                Previous
              </button>
            </div>

            <div>
              <button type="button" class="btn btn-success" onClick={()=>handlePage(1)}>
                Next
              </button>
            </div>
          </div>
        </>
      )}
      <div></div>
    </>
  );
};

export default News;
