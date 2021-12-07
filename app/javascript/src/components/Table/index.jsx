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
    <table {...getTableProps()} className="w-full mt-8">
      <thead className="text-left">
        {headerGroups.map((headerGroup, index) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={index}>
            {headerGroup.headers.map((column, index) => (
              <th
                {...column.getHeaderProps()}
                className="font-normal font-gray-500 pb-4 px-2"
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
            <tr {...row.getRowProps()} className="even:bg-gray-200" key={index}>
              {row.cells.map((cell, index) => {
                if (index === 0) {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="w-auto py-4 px-2 neeto-ui-text-secondary-indigo"
                      key={index}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                } else if (index === 5) {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="flex justify-end space-x-2 w-auto py-4 px-2"
                      key={index}
                    >
                      <Delete size={18} />
                      <Edit size={18} />
                    </td>
                  );
                }

                return (
                  <td
                    {...cell.getCellProps()}
                    className="w-auto py-4 px-2 capitalize"
                    key={index}
                  >
                    {cell.render("Cell")}
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

const ArticleTable = ({ articles }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "TITLE",
        accessor: "title",
      },
      {
        Header: "DATE",
        accessor: "date",
      },
      {
        Header: "AUTHOR",
        accessor: "author",
      },
      {
        Header: "CATEGORY",
        accessor: "name",
      },
      {
        Header: "STATUS",
        accessor: "status",
      },
      {
        Header: " ",
      },
    ],
    []
  );

  const data = useMemo(() => articles, [articles]);

  return <Table columns={columns} data={data} />;
};

export default ArticleTable;
