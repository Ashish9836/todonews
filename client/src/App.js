import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Todo from "./components/Todo";
import Profile from "./components/Profile";
import loaderFunctions from "./components/loaderFunc.js";
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  redirect,
} from "react-router-dom";
import Dummy from "./components/Dummy";
import NavbarComp from "./components/NavbarComp";
import News from "./components/News";
import { ToastContainer } from "react-toastify";
const router = createBrowserRouter([
  {
    path: "/",
    element: <News />,
    loader: () => loaderFunctions.checkProfileEligibility("news"),
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "profile",
    element: <Profile />,
    loader: () => loaderFunctions.checkProfileEligibility("profile"),
  },
  {
    path: "logout",
    element: <div>logout successful!</div>,
  },
  {
    path: "dummy*",
    element: <Dummy />,
    loader: () => {
      return "hey you used loader in dummy";
    },
  },
  {
    path: "todo",
    element: <Todo />,
    loader: () => loaderFunctions.checkProfileEligibility("todo"),
  },
  {
    path: "news",
    element: <News />,
    loader: () => loaderFunctions.checkProfileEligibility("news"),
  },
]);

function App() {
  return (
    <>
      <NavbarComp />
      <ToastContainer />
      <RouterProvider router={router} />
      {/* <Login />
      <Profile />
      <Todo/> */}
    </>
  );
}

export default App;
