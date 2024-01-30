import Home from "./pages/Home";
import Category from "../Categories/category";
export default [
  {
    path: "home",
    element: <Home />,
    name: "Home",
  },
  {
    path: "categories",
    element: <Category />,
    name: "Categories",
  },
];
