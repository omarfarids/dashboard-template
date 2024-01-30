import user from "@/assets/user.png";

type TableDataProps = {
  title: { label: string; key: string }[];
  data: any[];
};

const Table = ({ title, data }: TableDataProps) => {
  return (
    <div className="border border-[#091E4224] rounded-lg shadow-md ">
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead className="bg-lightGray">
            <tr>
              {title?.map((item: any) => {
                return <th className="py-3 text-lg">{item?.label}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) &&
              data?.map((item: any) => {
                return (
                  <tr>
                    {title.map((x: any) => {
                      return (
                        <td className="py-3 px-4">
                          {" "}
                          {x?.type === "image" ? (
                            <img
                              className="w-8"
                              src={
                                item?.[x?.key]?.length ? item?.[x?.key] : user
                              }
                              alt="avatar"
                            />
                          ) : (
                            item?.[x?.key] || "-"
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
