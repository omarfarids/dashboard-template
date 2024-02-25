import { useEffect, useState } from "react";

export const useSearch = (
  data: any,
  search: string,
  key: string | null = null
) => {
  const [filteredData, setFilteredData] = useState<any>([]);

  useEffect(() => {
    if (search !== "") {
      setFilteredData(
        data.filter((item: any) => {
          if (key) {
            return item[key].startsWith(search);
          } else {
            return item.startsWith(search);
          }
        })
      );
    } else {
      setFilteredData(data);
    }
  }, [search, data]);

  return [filteredData];
};
