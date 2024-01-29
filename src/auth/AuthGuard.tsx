import Dashboard from "@/layouts/dashboard/Index";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const AuthGuard = () => {
  const auth = Cookies.get("token");

  return auth ? <Dashboard /> : <Navigate to="/auth/login" />;
};
export default AuthGuard;
