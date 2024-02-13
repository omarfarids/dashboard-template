import user from "@/assets/user.png";
import { useNavigate } from "react-router-dom";
type TableDataProps = {
  title: { label: string; key: string }[];
  data: any[];
  hasActions?: boolean;
  onEdit?: any;
  onDelete?: any;
  isNavigatable?: boolean;
};
const Table = ({
  title,
  data,
  hasActions = false,
  onEdit = null,
  onDelete = null,
  isNavigatable = false,
}: TableDataProps) => {
  const navigate = useNavigate();
  return (
    <div className="border border-[#091E4224] rounded-lg shadow-md ">
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead className="bg-lightGray">
            <tr>
              {title?.map((item: any) => {
                return (
                  <th key={Math.random()} className="py-3 text-lg">
                    {item?.label}
                  </th>
                );
              })}
              {hasActions && <th className="py-3 text-lg">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) &&
              data?.map((item: any) => {
                return (
                  <tr
                    key={Math.random()}
                    className="cursor-pointer hover:bg-softGray"
                  >
                    {title.map((x: any) => {
                      return (
                        <td
                          key={Math.random()}
                          onClick={() => {
                            if (isNavigatable) {
                              navigate(`${item._id}`);
                            }
                          }}
                          className="py-3 px-4"
                        >
                          {" "}
                          {x?.type === "image" ? (
                            <img
                              className="w-8"
                              src={
                                item?.[x?.key]?.length ? item?.[x?.key] : user
                              }
                              alt="avatar"
                            />
                          ) : x?.type === "date" ? (
                            item?.[x?.key]?.split("T")[0] || "-"
                          ) : (
                            item?.[x?.key] || "-"
                          )}
                        </td>
                      );
                    })}
                    {hasActions && (
                      <td className="py-3 px-4 flex flex-row gap-2">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(item._id)}
                            className="btn"
                          >
                            Edit
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(item._id)}
                            className="btn btn-outline btn-error"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
        {!data || !data?.length ? (
          <div className="p-5 text-center font-bold">No Data to display!</div>
        ) : null}
      </div>
    </div>
  );
};

export default Table;
