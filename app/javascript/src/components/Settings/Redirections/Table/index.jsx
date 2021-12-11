import React, { useMemo } from "react";

import { Edit, Delete } from "@bigbinary/neeto-icons";
import { useTable } from "react-table";

const Table = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <table {...getTableProps()} className="w-full neeto-ui-bg-pastel-blue">
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={index}>
            {headerGroup.headers.map((column, index) => (
              <th
                {...column.getHeaderProps()}
                className="py-5 neeto-ui-text-gray-400 uppercase"
                key={index}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              className="bg-white border-b-8"
              key={index}
            >
              {row.cells.map((cell, index) => {
                if (index < 2) {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="px-8 py-4"
                      key={index}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                }

                return (
                  <td
                    {...cell.getCellProps()}
                    className="flex justify-center space-x-6 py-4"
                    key={index}
                  >
                    <Delete size={20} />
                    <Edit size={20} />
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

const RedirectionTable = () => {
  const columns = useMemo(
    () => [
      {
        Header: "From Path",
        accessor: "from",
      },
      {
        Header: "To path ",
        accessor: "to",
      },
      {
        Header: "Actions",
      },
    ],
    []
  );

  const data = useMemo(
    () => [
      { from: "https://scribble.com/welcome", to: "https://scribble.com" },
      { from: "https://scribble.com/welcome", to: "https://scribble.com" },
    ],
    []
  );

  return (
    <div className="px-8">
      <Table columns={columns} data={data} />
    </div>
  );
};

export default RedirectionTable;
