import React, { useState } from "react";

import { Plus, Check } from "@bigbinary/neeto-icons";
import { Typography, Input } from "@bigbinary/neetoui/v2";

import categoriesApi from "../../../apis/categories";

const NewCategory = ({ setRefresh, refresh }) => {
  const [newCategory, setNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await categoriesApi.create({ category: { name: newCategoryName } });
      setLoading(false);
      setNewCategory(false);
      setRefresh(!refresh);
      setNewCategoryName("");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="w-screen h-screen"></div>;
  }

  return (
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
        <Input
          className="w-1/2"
          value={newCategoryName}
          onChange={e => setNewCategoryName(e.target.value)}
          error={
            newCategoryName.trim().length === 0 && "Please enter category name"
          }
          suffix={
            newCategoryName.trim().length !== 0 && (
              <Check onClick={handleSubmit} />
            )
          }
        />
      )}
    </div>
  );
};

export default NewCategory;
