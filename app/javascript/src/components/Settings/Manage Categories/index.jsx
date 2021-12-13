import React, { useState, useEffect } from "react";

import { Plus, Check, Reorder, Delete, Edit } from "@bigbinary/neeto-icons";
import { Typography, Input } from "@bigbinary/neetoui/v2";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import categoriesApi from "../../../apis/categories";

function ManageCategoriesPage() {
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [newCategory, setNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.list();
      setCharacters(response.data.categories);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handleOnDragEnd = result => {
    if (!result.destination) return;
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCharacters(items);
    handleUpdateCategory(result);
  };

  const handleUpdateCategory = async result => {
    try {
      await categoriesApi.update({
        id: result.draggableId,
        payload: {
          category: { sequence: result.destination.index + 1 },
        },
      });
      setLoading(false);
      await fetchCategories();
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await categoriesApi.create({ category: { name: newCategoryName } });
      setLoading(false);
      setNewCategory(false);
      fetchCategories();
      setNewCategoryName("");
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

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return <div className="w-screen h-screen"></div>;
  }

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
            <Input
              className="w-1/2"
              value={newCategoryName}
              onChange={e => setNewCategoryName(e.target.value)}
              suffix={
                <Check
                  onClick={handleSubmit}
                  disabled={newCategoryName.trim().length === 0}
                />
              }
            />
          )}
        </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="categories">
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {characters.map((item, index) => {
                  return (
                    <Draggable
                      draggableId={`${item.id}`}
                      index={index}
                      key={item.id}
                    >
                      {provided => (
                        <div
                          className="flex justify-between px-2 py-2 border-b-2"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <div className="flex space-x-2">
                            <Reorder size={20} />
                            {item.id === editCategory ? (
                              <Input
                                value={categoryName}
                                onChange={e => setCategoryName(e.target.value)}
                                suffix={
                                  <Check
                                    onClick={handleEditCategory}
                                    disabled={categoryName.trim().length === 0}
                                  />
                                }
                              />
                            ) : (
                              <Typography>{item.name}</Typography>
                            )}
                          </div>
                          <div className="flex space-x-4">
                            <Delete
                              size={20}
                              onClick={() => handleDelete(item.id)}
                            />
                            <Edit size={20} onClick={() => handleEdit(item)} />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default ManageCategoriesPage;
