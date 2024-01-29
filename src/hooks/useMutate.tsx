import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

export const useMutate = () => {
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
        return response.data;
      } catch (error: any) {
        throw new Error(error.response?.data || "An error occurred");
      }
    },
  });

  return {
    ...mutation,
  };
};
