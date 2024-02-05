import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
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
  {
    path: "orders",
    element: <Orders />,
    name: "Orders",
  },
];
