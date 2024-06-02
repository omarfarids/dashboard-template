import { createBrowserRouter } from "react-router-dom";
import Auth from "@/layouts/auth/Index.tsx";
import Client from "@/layouts/client/Index";
import authRoutes from "@/modules/auth/routes";
import settingsRoutes from "@/modules/user/routes";
import clientRoutes from "@/modules/client/routes";
import AuthGuard from "@/auth/AuthGuard";
import ErrorPage from "@/components/ErrorPage";
import NotFound from "@/components/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthGuard />,
    errorElement: <ErrorPage />,
    children: [...settingsRoutes],
  },
  {
    path: "/auth",
    element: <Auth />,
    errorElement: <ErrorPage />,
    children: [...authRoutes],
  },
  {
    path: "/client",
    element: <Client />,
    errorElement: <ErrorPage />,
    children: [...clientRoutes],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
