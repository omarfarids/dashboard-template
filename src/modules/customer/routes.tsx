import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
export default [
  {
    path: "/customer/:userId",
    element: <Categories />,
    name: "Categories",
  },
  {
    path: "/customer/products/:categoryId/:userId",
    element: <Products />,
    name: "Products",
  },
  {
    path: "/customer/orders",
    element: <Orders />,
    name: "Orders",
  },
];
