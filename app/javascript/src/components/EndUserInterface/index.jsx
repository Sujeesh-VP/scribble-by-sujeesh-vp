import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import categoriesApi from "../../apis/categories";

function EndUserInterface() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.userList();
      history.push(
        `/scribble/articles/${response.data.categories[0].articles[0].slug}`
      );
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

  return <div>Error</div>;
}

export default EndUserInterface;
