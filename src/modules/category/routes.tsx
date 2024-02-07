import Category from "./pages/Category";
import Product from "./pages/Product";
export default [
  {
    path: "/category",
    element: <Category />,
    name: "Categories",
  },
  {
    path: "/category/:categoryId",
    element: <Product />,
    name: "Categories",
  },
];
