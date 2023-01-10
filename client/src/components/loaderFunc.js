import {toast} from "react-toastify";
import { redirect } from "react-router-dom";
const checkProfileEligibility = (para) => {
  // console.log(para, "para");
  const jwt = localStorage.getItem("jwt");
  if (!jwt) {
    localStorage.setItem("redirect", para);
    toast.error("Please login first", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return redirect("/login");
  }
  return "profile found!";
};
const loaderData = { checkProfileEligibility };
export default loaderData;
