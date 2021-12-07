import axios from "axios";

const list = () => axios.get("/articles");
const show = () => axios.get("articles/show");

const articlesApi = {
  list,
  show,
};

export default articlesApi;
