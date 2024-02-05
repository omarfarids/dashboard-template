import { createBrowserRouter } from "react-router-dom";
import Auth from "@/layouts/auth/Index.tsx";
import Customer from "@/layouts/customer/Index.tsx";
import authRoutes from "@/modules/auth/routes";
import dashboardRoutes from "@/modules/home/routes";
import settingsRoutes from "@/modules/user/routes";
import categoryRoutes from "@/modules/category/routes";
import productRoutes from "@/modules/product/routes";
import customerRoutes from "@/modules/customer/routes";
import AuthGuard from "@/auth/AuthGuard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthGuard />,
    children: [
      ...dashboardRoutes,
      ...categoryRoutes,
      ...productRoutes,
      ...settingsRoutes,
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [...authRoutes],
  },
  {
    path: "/customer",
    element: <Customer />,
    children: [...customerRoutes],
  },
]);

export default router;
