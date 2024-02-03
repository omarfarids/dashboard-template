import Category from "./page/Category";
import Product from "./page/Product";
export default [
  {
    path: "category",
    element: <Category />,
    name: "Categories",
  },
  {
    path: "category/:categoryId",
    element: <Product />,
    name: "Categories",
  },
];
