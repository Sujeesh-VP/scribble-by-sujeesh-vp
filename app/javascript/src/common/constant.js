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

export { VALIDATION_SCHEMA, INITIAL_VALUES };
