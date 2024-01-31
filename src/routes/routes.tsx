import { createBrowserRouter } from "react-router-dom";
import Auth from "@/layouts/auth/Index.tsx";
import authRoutes from "@/modules/auth/routes";
import dashboardRoutes from "@/modules/home/routes";
import settingsRoutes from "@/modules/user/routes";
import categoryRoutes from "@/modules/category/routes";
import productRoutes from "@/modules/product/routes";
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
    path: "auth",
    element: <Auth />,
    children: [...authRoutes],
  },
]);

export default router;
