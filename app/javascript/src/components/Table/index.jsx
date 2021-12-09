import React, { useMemo } from "react";

import { Edit, Delete } from "@bigbinary/neeto-icons";
import { useTable } from "react-table";

const Table = ({ columns, data, deleteArticle, editArticle }) => {
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
                className="font-normal font-gray-500 pb-4 px-2 uppercase"
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
                } else if (index === row.cells.length - 1) {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="flex justify-end space-x-2 w-auto py-4 px-2"
                      key={index}
                    >
                      <Delete
                        size={18}
                        onClick={() => deleteArticle(cell.row.original?.id)}
                      />
                      <Edit
                        size={18}
                        onClick={() => editArticle(cell.row.original)}
                      />
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

const ArticleTable = ({
  articles,
  deleteArticle,
  editArticle,
  tableColumns,
}) => {
  const columns = tableColumns
    .filter(item => item.selected)
    .map((item, index) => {
      if (item.value === "category") {
        return { Header: item.value, accessor: "name", id: index };
      }

      if (item.value !== "") {
        return { Header: item.value, accessor: item.value, id: index };
      }

      return { Header: "", id: index };
    });

  const data = useMemo(() => articles, [articles]);

  return columns.length !== 1 ? (
    <Table
      columns={columns}
      data={data}
      deleteArticle={deleteArticle}
      editArticle={editArticle}
    />
  ) : (
    <div className="flex justify-center pt-32">Select atleast one column</div>
  );
};

export default ArticleTable;
