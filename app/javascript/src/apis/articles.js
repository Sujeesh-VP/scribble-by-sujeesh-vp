import axios from "axios";

const list = () => axios.get("/articles");
const show = () => axios.get("articles/show");
const create = payload => axios.post("/articles/", payload);
const destroy = id => axios.delete(`/articles/${id}`);

const articlesApi = {
  list,
  show,
  create,
  destroy,
};

export default articlesApi;
