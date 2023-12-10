import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          Cookies.set("token_", "login", { expires: 1 });
          navigate("/dashboard");
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
