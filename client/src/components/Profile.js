import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
const Profile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

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
        setProfile(() => response.data);
      })
      .catch((error) => {
        toast.error("something went error!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/login");
      });
  });
  const handleLogout = () => {
    toast.success("Logout Successful!", {
      position: toast.POSITION.TOP_RIGHT,
    });
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  return (
    <>
      {profile ? (
        <div className="vh-100" style={{ backgroundColor: "#9de2ff" }}>
          <MDBContainer>
            <MDBRow className="justify-content-center">
              <MDBCol md="9" lg="7" xl="5" className="mt-5">
                <MDBCard style={{ borderRadius: "15px" }}>
                  <MDBCardBody className="p-4">
                    <div className="d-flex text-black">
                      <div className="flex-shrink-0">
                        <MDBCardImage
                          style={{ width: "180px", borderRadius: "10px" }}
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                          alt="Generic placeholder image"
                          fluid
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <MDBCardTitle>{profile.name}</MDBCardTitle>
                        <MDBCardText>{profile.username}</MDBCardText>

                        <div
                          className="d-flex justify-content-start rounded-3 p-2 mb-2"
                          style={{ backgroundColor: "#efefef" }}
                        >
                          <div>
                            <button
                              style={{ color: "red", border: "none" }}
                              onClick={handleLogout}
                            >
                              Logout
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      ) : (
        <h4>profle is loading</h4>
      )}
    </>
  );
};

export default Profile;
