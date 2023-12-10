import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
  const auth: string | undefined = Cookies.get("token_");

  return auth ? <Outlet /> : <Navigate to="/" />;
};
export default AuthGuard;
