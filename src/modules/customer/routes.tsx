import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
export default [
  {
    path: ":userId",
    element: <Categories />,
    name: "Categories",
  },
  {
    path: "products/:categoryId",
    element: <Products />,
    name: "Products",
  },
  {
    path: "orders",
    element: <Orders />,
    name: "Orders",
  },
];
