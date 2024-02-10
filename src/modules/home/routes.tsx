import Home from "./pages/Home";
import UsersCategory from "./pages/UsersCategory";
import UsersProduct from "./pages/UsersProduct";
export default [
  {
    path: "/home",
    element: <Home />,
    name: "Home",
  },
  {
    path: "/home/:userId",
    element: <UsersCategory />,
    name: "UsersCategory",
  },
  {
    path: "/home/:userId/:categoryId",
    element: <UsersProduct />,
    name: "UsersProdect",
  },
];
