import React, { useState, useEffect } from "react";

import { Button, Dropdown, PageLoader } from "@bigbinary/neetoui/v2";
import { Input, Select, Textarea } from "@bigbinary/neetoui/v2/formik";
import { Formik, Form } from "formik";

import categoriesApi from "../../../apis/categories";
import { VALIDATION_SCHEMA, INITIAL_VALUES } from "../../../common/constant";

const ArticleForm = ({
  handleCreate,
  handleEdit,
  setStatus,
  status,
  loading,
  setLoading,
  details,
}) => {
  const [categoryValues, setCategoryValues] = useState([]);

  const fetchCategoryDetails = async () => {
    try {
      const response = await categoriesApi.list();
      setCategoryValues(response.data.categories);
      setLoading(false);
      6;
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Formik
      initialValues={details || INITIAL_VALUES}
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={details ? handleEdit : handleCreate}
    >
      <Form className="flex flex-col pt-10">
        <div className="flex self-center w-1/2 pb-4 space-x-2">
          <Input label="Article Title" name="title" />
          <Select
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
            placeholder={details?.name || "Select"}
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
  );
};

export default ArticleForm;
