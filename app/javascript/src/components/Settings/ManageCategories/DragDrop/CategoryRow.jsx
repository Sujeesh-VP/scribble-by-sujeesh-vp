import React, { useState } from "react";

import { Check, Reorder, Delete, Edit } from "@bigbinary/neeto-icons";
import { Typography, Input, PageLoader } from "@bigbinary/neetoui/v2";

import categoriesApi from "../../../../apis/categories";

function CategoryRow({ item, fetchCategories }) {
  const [editCategory, setEditCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEdit = value => {
    setEditCategory(value.id);
    setCategoryName(value.name);
  };

  const handleEditCategory = async () => {
    try {
      await categoriesApi.update({
        id: editCategory,
        payload: {
          category: { name: categoryName },
        },
      });
      setLoading(false);
      setEditCategory("");
      await fetchCategories();
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handleDelete = async id => {
    if (confirm("Are you sure?")) {
      try {
        await categoriesApi.destroy(id);
        setLoading(false);
        await fetchCategories();
      } catch (error) {
        logger.error(error);
      }
    }
  };

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex justify-between px-2 py-2 border-b-2">
      <div className="flex space-x-2">
        <Reorder size={20} />
        {item.id === editCategory ? (
          <Input
            value={categoryName}
            onChange={e => setCategoryName(e.target.value)}
            error={
              categoryName.trim().length === 0 && "Please enter category name"
            }
            suffix={
              categoryName.trim().length !== 0 && (
                <Check
                  onClick={handleEditCategory}
                  disabled={categoryName.trim().length === 0}
                />
              )
            }
          />
        ) : (
          <Typography>{item.name}</Typography>
        )}
      </div>
      <div className="flex space-x-4">
        <Delete size={20} onClick={() => handleDelete(item.id)} />
        <Edit size={20} onClick={() => handleEdit(item)} />
      </div>
    </div>
  );
}

export default CategoryRow;
