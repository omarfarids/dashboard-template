import { createBrowserRouter } from "react-router-dom";
import Auth from "@/layouts/auth/Index.tsx";
import Dashboard from "@/layouts/dashboard/Index";
import authRoutes from "@/modules/auth/routes";
import dashboardRoutes from "@/modules/home/routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [...dashboardRoutes],
  },
  {
    path: "auth",
    element: <Auth />,
    children: [...authRoutes],
  },
]);

export default router;
