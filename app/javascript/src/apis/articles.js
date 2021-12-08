import axios from "axios";

const list = () => axios.get("/articles");
const show = () => axios.get("articles/show");
const create = payload => axios.post("/articles/", payload);

const articlesApi = {
  list,
  show,
  create,
};

export default articlesApi;
