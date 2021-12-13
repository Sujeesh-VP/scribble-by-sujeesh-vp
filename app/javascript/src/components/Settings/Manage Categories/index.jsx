import React, { useState } from "react";

import { Typography } from "@bigbinary/neetoui/v2";

import DragDrop from "./DragDrop";
import NewCategory from "./NewCategory";

const ManageCategoriesPage = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="flex flex-col items-center pt-4">
      <div className="w-1/2">
        <Typography style="h1">Manage Categories</Typography>
        <Typography style="body1" className="neeto-ui-text-gray-500 pb-6">
          Create and configure the categories inside your scribble.
        </Typography>

        <NewCategory setRefresh={setRefresh} refresh={refresh} />
        <DragDrop refresh={refresh} />
      </div>
    </div>
  );
};

export default ManageCategoriesPage;
