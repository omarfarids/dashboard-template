import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const useGetData = (url: string) => {
  const navigate = useNavigate();

  const query: any = useQuery<any>({
    queryKey: ["repoData"],
    queryFn: async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_BASE_URL + url, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        return response.data;
      } catch (error: any) {
        if (error?.response?.status === 401) {
          Cookies.remove("token");
          Cookies.remove("username");
          Cookies.remove("image");
          Cookies.remove("userId");
          Cookies.remove("role");
          navigate("/auth/login");
        }
      }
    },
    retry: 0,
  });

  return { ...query };
};
