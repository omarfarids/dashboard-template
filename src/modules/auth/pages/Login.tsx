import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "@/components/TextInput"; // Adjust the import path as needed
import Button from "@/components/Button"; // Adjust the import path as needed

const Login = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    userName: "",
    password: "",
  });

  const validateUserData = () => {
    return userData.userName.length > 0 && userData.password.length > 0;
  };

  const handleLogin = (e: any) => {
    if (validateUserData()) {
      e.preventDefault();
      navigate("/home");
    }
  };

  return (
    <section>
      <form onSubmit={handleLogin} className="flex flex-col gap-2 items-center">
        <h1 className="text-3xl font-semibold mb-5">Login to your account</h1>
        <TextInput
          name="email"
          value={userData.userName}
          placeholder="Email Address"
          onChange={(e: any) =>
            setUserData({ ...userData, userName: e.target.value })
          }
        />
        <TextInput
          name="password"
          placeholder="Password"
          type="password"
          value={userData.password}
          onChange={(e: any) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <Button label="Login" className="w-full rounded-sm mt-2" />
      </form>
    </section>
  );
};

export default Login;
