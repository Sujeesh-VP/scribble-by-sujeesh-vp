import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import ArticleForm from "./Form";

import articlesApi from "../../apis/articles";
import NavBar from "../common/NavBar";

const NewArticle = () => {
  const [status, setStatus] = useState("draft");
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const handleSubmitNew = async values => {
    const { title, category, content } = values;
    try {
      await articlesApi.create({
        article: {
          title,
          content,
          status: status,
          category_id: category.value,
        },
      });
      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <ArticleForm
        handleSubmitNew={handleSubmitNew}
        setStatus={setStatus}
        status={status}
        setLoading={setLoading}
        loading={loading}
      />
    </div>
  );
};

export default NewArticle;
