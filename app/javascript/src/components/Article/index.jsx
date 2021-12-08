import React, { useState, useEffect } from "react";

import { Button, Dropdown } from "@bigbinary/neetoui/v2";
import { Input, Select, Textarea } from "@bigbinary/neetoui/v2/formik";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";

import articlesApi from "../../apis/articles";
import categoriesApi from "../../apis/categories";
import { VALIDATION_SCHEMA, INITIAL_VALUES } from "../../common/constant";
import NavBar from "../common/NavBar";

const NewArticle = () => {
  const [status, setStatus] = useState("draft");
  const [loading, setLoading] = useState(true);
  const [categoryValues, setCategoryValues] = useState([]);
  const history = useHistory();

  const fetchCategoryDetails = async () => {
    try {
      const response = await categoriesApi.list();
      setCategoryValues(response.data.categories);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handleSubmit = async values => {
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
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  if (loading) {
    return <div className="w-screen h-screen"></div>;
  }

  return (
    <div>
      <NavBar />
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col pt-10">
          <div className="flex self-center w-1/2 pb-4 space-x-2">
            <Input label="Article Title" name="title" />
            <Select
              isClearable
              isSearchable
              size="small"
              label="Category"
              name="category"
              options={categoryValues
                .filter(item => item !== "")
                .map(item => {
                  return {
                    label: item.name,
                    value: item.id,
                  };
                })}
            />
          </div>
          <Textarea
            label="Article Body"
            placeholder="Enter Content"
            className="self-center w-1/2 pb-4"
            name="content"
          />
          <div className="flex self-center w-1/2">
            <Button
              label={`Save ${status}`}
              type="submit"
              className="neeto-ui-bg-secondary-indigo neeto-ui-text-white"
            />
            <Dropdown
              position="bottom"
              buttonStyle="primary"
              buttonProps={{
                className: "neeto-ui-bg-secondary-indigo neeto-ui-text-white",
              }}
            >
              <li onClick={() => setStatus("published")}>Published</li>
            </Dropdown>
            <Button style="text" label="Cancel" to={"/"} />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default NewArticle;
