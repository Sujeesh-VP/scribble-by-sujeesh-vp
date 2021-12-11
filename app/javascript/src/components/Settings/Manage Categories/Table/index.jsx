import React, { useMemo } from "react";

import { Reorder } from "@bigbinary/neeto-icons";
import { Edit, Delete } from "@bigbinary/neeto-icons";
import { useTable } from "react-table";

const Table = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <table {...getTableProps()} className="w-full">
      <tbody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              className="bg-white border-b-2"
              key={index}
            >
              {row.cells.map((cell, index) => {
                if (index === 0) {
                  return (
                    <td {...cell.getCellProps()} key={index}>
                      <div className="flex align-middle">
                        <Reorder size={18} />
                        {cell.render("Cell")}
                      </div>
                    </td>
                  );
                }

                return (
                  <td
                    {...cell.getCellProps()}
                    className="flex justify-end space-x-6 pr-4 align-middle py-4"
                    key={index}
                  >
                    <Delete size={18} />
                    <Edit size={18} />
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const CategoriesTable = () => {
  const columns = useMemo(
    () => [
      {
        Header: "category",
        accessor: "value",
      },
      {
        Header: "actions",
      },
    ],
    []
  );

  const data = useMemo(
    () => [
      { value: "Security & Privacy" },
      { value: "Misc" },
      { value: "Gettiong Started" },
    ],
    []
  );

  return (
    <div className="">
      <Table columns={columns} data={data} />
    </div>
  );
};

export default CategoriesTable;
