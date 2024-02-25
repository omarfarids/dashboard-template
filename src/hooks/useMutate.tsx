import { notify } from "@/utils/notify";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const useMutate = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async ({ url, body, method }: any) => {
      try {
        const response = await axios({
          method,
          url: import.meta.env.VITE_BASE_URL + url,
          data: body,
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });

        notify(response?.data?.message, "success");
        return response.data;
      } catch (error: any) {
        notify(error.response.data?.message, "error");
        if (error?.response?.status === 401) {
          Cookies.remove("token");
          Cookies.remove("username");
          Cookies.remove("image");
          Cookies.remove("userId");
          Cookies.remove("role");
          navigate("/auth/login");
        }
        throw new Error(error.response.data || "An error occurred");
      }
    },
  });

  return {
    ...mutation,
  };
};
