import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

export const useGetData = (url: string) => {
  const query = useQuery<any>({
    queryKey: ["repoData"],
    queryFn: async () => {
      const response = await axios.get(import.meta.env.VITE_BASE_URL + url, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return response.data;
    },
    retry: 0,
  });

  return { ...query };
};
