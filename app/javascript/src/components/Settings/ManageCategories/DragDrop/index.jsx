import React, { useState, useEffect } from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import CategoryRow from "./CategoryRow";

import categoriesApi from "../../../../apis/categories";

const DragDrop = ({ refresh }) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.list();
      setCategories(response.data.categories);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handleOnDragEnd = result => {
    if (!result.destination) return;
    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCategories(items);
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

  useEffect(() => {
    fetchCategories();
  }, [refresh]);

  if (loading) {
    return <div className="w-screen h-screen"></div>;
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="categories">
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {categories.map((item, index) => {
              return (
                <Draggable
                  draggableId={`${item.id}`}
                  index={index}
                  key={item.id}
                >
                  {provided => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <CategoryRow
                        item={item}
                        fetchCategories={fetchCategories}
                      />
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
  );
};

export default DragDrop;
