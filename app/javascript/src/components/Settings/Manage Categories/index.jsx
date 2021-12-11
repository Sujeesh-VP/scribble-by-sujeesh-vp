import React, { useState } from "react";

import { Plus, Check } from "@bigbinary/neeto-icons";
import { Typography, Input } from "@bigbinary/neetoui/v2";

import CategoriesTable from "./Table";

function ManageCategoriesPage() {
  const [newCategory, setNewCategory] = useState(false);
  return (
    <div className="flex flex-col items-center pt-4">
      <div className="w-1/2">
        <Typography style="h1">Manage Categories</Typography>
        <Typography style="body1" className="neeto-ui-text-gray-500 pb-6">
          Create and configure the categories inside your scribble.
        </Typography>
        <div className=" py-4 border-b-2">
          {!newCategory ? (
            <Typography
              className="flex neeto-ui-text-secondary-indigo"
              onClick={() => setNewCategory(!newCategory)}
            >
              <Plus />
              Add new category
            </Typography>
          ) : (
            <Input className="w-1/2" suffix={<Check />} />
          )}
        </div>
        <CategoriesTable />
      </div>
    </div>
  );
}

export default ManageCategoriesPage;
