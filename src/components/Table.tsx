import user from "@/assets/user.png";
type TableDataProps = {
  title: { label: string; key: string }[];
  data: any[];
  hasActions?: boolean;
  onEdit?: any;
  onDelete?: any;
};

const Table = ({
  title,
  data,
  hasActions = false,
  onEdit = null,
  onDelete = null,
}: TableDataProps) => {
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
                  <tr key={Math.random()}>
                    {title.map((x: any) => {
                      return (
                        <td key={Math.random()}>
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
                    {hasActions && (
                      <td className="py-3 px-4 flex flex-row gap-2">
                        {onEdit ?? (
                          <button onClick={onEdit} className="btn">
                            Edit
                          </button>
                        )}
                        {onEdit ?? (
                          <button
                            onClick={onDelete}
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
      </div>
    </div>
  );
};

export default Table;
