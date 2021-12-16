import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

import ArticleForm from "./Form";

import articlesApi from "../../apis/articles";
import NavBar from "../common/NavBar";

const EditArticle = () => {
  const [status, setStatus] = useState("draft");
  const [loading, setLoading] = useState(false);
  const props = useLocation();

  const history = useHistory();

  const handleEdit = async values => {
    const { title, category, content, id } = values;
    try {
      await articlesApi.update({
        id,
        payload: {
          article: {
            title,
            content,
            category_id: category.value,
            status: status,
          },
        },
      });

      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <ArticleForm
        setStatus={setStatus}
        status={status}
        setLoading={setLoading}
        details={props.state.details}
        handleEdit={handleEdit}
        loading={loading}
      />
    </div>
  );
};

export default EditArticle;
