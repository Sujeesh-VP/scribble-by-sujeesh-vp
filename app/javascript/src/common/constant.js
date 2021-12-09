import * as yup from "yup";

const VALIDATION_SCHEMA = yup.object({
  title: yup.string().required("Required"),
  content: yup.string().required("Required"),
  category: yup.object().required("Required"),
});

const INITIAL_VALUES = {
  title: "",
  category: "",
  content: "",
  status: "",
};

const COLUMN_TITLE = ["title", "date", "author", "category", "status", ""];

const COLUMN_HEADERS = COLUMN_TITLE.map(title => {
  return {
    key: title,
    value: title,
    selected: true,
  };
});

export { VALIDATION_SCHEMA, INITIAL_VALUES, COLUMN_HEADERS };
