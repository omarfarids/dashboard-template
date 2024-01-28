import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetData = (url: string) => {
  const { data, isLoading, error } = useQuery<any>({
    queryKey: ["repoData"],
    queryFn: async () => {
      const response = await axios.get(import.meta.env.BASE_URL + url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    },
  });

  return { data, isLoading, error };
};
