import Categories from "./pages/Categories";
import Products from "./pages/Products";

export default [
  {
    path: "",
    element: <Categories />,
    name: "Categories",
  },
  {
    path: "products",
    element: <Products />,
    name: "Products",
  },
];
