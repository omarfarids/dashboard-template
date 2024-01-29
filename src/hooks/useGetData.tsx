import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

export const useGetData = (url: string) => {
  const { data, isLoading, error, refetch } = useQuery<any>({
    queryKey: ["repoData"],
    queryFn: async () => {
      const response = await axios.get(import.meta.env.VITE_BASE_URL + url, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return response.data;
    },
    retry: 3,
  });

  return { data, isLoading, error, refetch };
};
