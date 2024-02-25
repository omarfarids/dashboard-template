import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
export default [
  {
    path: "/auth/login",
    element: <Login />,
    name: "Login",
  },
  {
    path: "/auth/sign-up",
    element: <SignUp />,
    name: "Sign-Up",
  },
];
