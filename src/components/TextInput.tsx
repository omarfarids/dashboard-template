import React, { useState } from "react";
// import { useField, ErrorMessage } from 'vee-validate';
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

interface TextInputProps {
  placeholder: string;
  type?: "text" | "password";
  name: string;
  onChange: any;
  value: string;
}

const TextInput = ({
  placeholder,
  type = "text",
  name,
  onChange,
  value,
}: TextInputProps) => {
  //   const { value, errorMessage, handleInput } = useField(name, isRequired);
  const [isPassword, setIsPassword] = useState(true);

  const togglePassword = () => {
    setIsPassword(!isPassword);
  };

  return (
    <div>
      <div className="relative">
        <input
          type={isPassword ? type : "text"}
          name={name}
          placeholder={placeholder}
          className="input input-bordered input-md w-full sm:w-[450px] rounded-sm"
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <div className="absolute right-3 top-[13px] cursor-pointer">
            {isPassword ? (
              <VisibilityOutlinedIcon
                fontSize="small"
                onClick={togglePassword}
              />
            ) : (
              <VisibilityOffOutlinedIcon
                fontSize="small"
                onClick={togglePassword}
              />
            )}
          </div>
        )}
      </div>
      {/* <ErrorMessage name={name} className="text-red-500 text-sm p-2" /> */}
    </div>
  );
};

export default TextInput;
