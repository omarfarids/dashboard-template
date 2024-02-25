import { createBrowserRouter } from "react-router-dom";
import Auth from "@/layouts/auth/Index.tsx";
import Client from "@/layouts/client/Index";
import authRoutes from "@/modules/auth/routes";
import settingsRoutes from "@/modules/user/routes";
import clientRoutes from "@/modules/client/routes";
import AuthGuard from "@/auth/AuthGuard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthGuard />,
    children: [...settingsRoutes],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [...authRoutes],
  },
  {
    path: "/client",
    element: <Client />,
    children: [...clientRoutes],
  },
]);

export default router;
