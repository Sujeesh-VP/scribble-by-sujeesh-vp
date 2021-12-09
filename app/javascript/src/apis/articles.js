import axios from "axios";

const list = () => axios.get("/articles");
const show = () => axios.get("articles/show");
const create = payload => axios.post("/articles/", payload);
const destroy = id => axios.delete(`/articles/${id}`);
const update = ({ id, payload }) => axios.put(`/articles/${id}`, payload);

const articlesApi = {
  list,
  show,
  create,
  destroy,
  update,
};

export default articlesApi;
