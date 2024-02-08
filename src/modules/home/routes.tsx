import Home from "./pages/Home";
import UsersCategory from "./admin/UsersCategory";
import UsersProduct from "./admin/UsersProduct";
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
