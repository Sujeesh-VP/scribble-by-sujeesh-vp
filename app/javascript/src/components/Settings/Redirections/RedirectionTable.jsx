import React, { useState } from "react";

import { Check, Delete, Edit } from "@bigbinary/neeto-icons";
import { Typography, Input } from "@bigbinary/neetoui/v2";

const RedirectionTable = ({
  item,
  index,
  handleDelete,
  handleEdit,
  setEditRedirection,
  editRedirection,
}) => {
  const [editFromPath, setEditFromPath] = useState("");
  const [editToPath, setEditToPath] = useState("");

  const handleEditClick = item => {
    setEditRedirection(item.id);
    setEditFromPath(item.from);
    setEditToPath(item.to);
  };

  return (
    <div className="flex justify-between py-4 px-2 bg-white mb-2" key={index}>
      <div className="w-1/3 break-all">
        {editRedirection === item.id ? (
          <Input
            value={editFromPath}
            onChange={e => setEditFromPath(e.target.value)}
            error={editFromPath.trim().length === 0 && "Please enter from path"}
          />
        ) : (
          <Typography className="text-left">{item.from}</Typography>
        )}
      </div>
      <div className="w-1/3 self-start break-all">
        {editRedirection === item.id ? (
          <Input
            value={editToPath}
            onChange={e => setEditToPath(e.target.value)}
            error={editToPath.trim().length === 0 && "Please enter to path"}
          />
        ) : (
          <Typography className="text-left">{item.to}</Typography>
        )}
      </div>

      <div className="flex space-x-2 pr-4">
        <Delete onClick={() => handleDelete(item.id)} />
        <Edit onClick={() => handleEditClick(item)} />
        {editToPath.trim().length !== 0 &&
          editFromPath.trim().length !== 0 &&
          editRedirection === item.id && (
            <Check onClick={() => handleEdit({ editFromPath, editToPath })} />
          )}
      </div>
    </div>
  );
};
export default RedirectionTable;
