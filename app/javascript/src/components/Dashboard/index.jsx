import React, { useState, useEffect, useCallback } from "react";

import { Search, Plus } from "@bigbinary/neeto-icons";
import {
  Input,
  Button,
  Typography,
  Dropdown,
  Checkbox,
  PageLoader,
} from "@bigbinary/neetoui/v2";
import { debounce } from "lodash";
import { useHistory } from "react-router-dom";

import articlesApi from "../../apis/articles";
import { COLUMN_HEADERS } from "../../common/constant";
import Container from "../common/Container";
import ArticleTable from "../Table";

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("");
  const [inputValue, setInputValue] = useState("");
  const history = useHistory();
  const [tableColumns, setTableColumns] = useState(COLUMN_HEADERS);

  const fetchArticles = async () => {
    try {
      const response = await articlesApi.list();
      setArticles(response.data.articles);
      setData(response.data.articles);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const debounceLoadData = useCallback(
    debounce((e, list) => handleSearch(e, list), 100)
  );

  const handleFilterChange = value => {
    setInputValue(value);
    debounceLoadData(value, data, status);
  };

  const handleSearch = (props, list, categoryProp, statusProp = null) => {
    const temp = [];
    if (props.length === 0) {
      handleArticles(status || "all");
    } else {
      list.map(item => {
        if (item?.title?.toLowerCase().includes(props)) {
          if (statusProp) {
            if (categoryProp?.name) {
              statusProp === item.status &&
                item.name === categoryProp?.name &&
                temp.push(item);
            } else {
              statusProp === item.status && temp.push(item);
            }
          } else {
            if (categoryProp?.name) {
              item.name === categoryProp?.name && temp.push(item);
            } else {
              temp.push(item);
            }
          }
        }
      });

      setArticles(temp);
    }
  };

  const handleArticles = (statusProp, categoryProp) => {
    let temp = [];
    if (statusProp === "all") {
      if (categoryProp?.name) {
        data.map(item => {
          item.name === categoryProp.name && temp.push(item);
        });
        setArticles(temp);
      } else {
        temp = data;
        setArticles(temp);
      }
    } else {
      data.map(item => {
        if (item?.status === statusProp) {
          if (categoryProp?.name) {
            item.name === categoryProp.name && temp.push(item);
          } else {
            temp.push(item);
          }
        }
      });
      setArticles(temp);
    }
  };

  const deleteArticle = async id => {
    if (confirm("Are you sure?")) {
      try {
        await articlesApi.destroy(id);
        setLoading(true);
        await fetchArticles();
      } catch (error) {
        logger.error(error);
      }
    }
  };

  const editArticle = details => {
    history.push({
      pathname: `/article/edit`,
      state: { details },
    });
  };

  const handleChange = e => {
    const selectedColumns = tableColumns.map(item => {
      if (item.value === e.target.name) {
        return { ...item, selected: !item.selected };
      }

      return item;
    });

    setTableColumns(selectedColumns);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    setInputValue("");
    if (data.length) {
      if (status) {
        handleArticles(status, category);
      }
    }
  }, [status, category]);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <CategoryContext.Provider value={[category, setCategory]}>
      <ArticleContext.Provider value={[status, setStatus]}>
        <Container page={"dashboard"}>
          <div className="flex space-x-4 justify-end">
            <div className="w-1/3">
              <Input
                placeholder="Search article title"
                prefix={<Search />}
                value={inputValue}
                onChange={e => handleFilterChange(e.target.value)}
              />
            </div>
            <Dropdown
              buttonProps={{
                size: "large",
              }}
              label="Columns"
              position="bottom-end"
              buttonStyle="secondary"
            >
              <form onChange={handleChange}>
                <Typography className="py-2 px-2">Columns</Typography>
                {tableColumns.map((item, index) => {
                  return (
                    index < 5 && (
                      <Checkbox
                        label={item.value}
                        id={item.value}
                        key={index}
                        className="py-2 px-2"
                        defaultChecked={item.selected}
                      />
                    )
                  );
                })}
              </form>
            </Dropdown>
            <Button
              label="Add New Article"
              style="secondary"
              size="large"
              icon={Plus}
              className="neeto-ui-bg-secondary-indigo neeto-ui-text-white"
              to={"/article/new"}
            />
          </div>
          <Typography className="pt-4 font-bold">
            {articles.length} Articles
          </Typography>
          <div>
            <ArticleTable
              articles={articles}
              deleteArticle={deleteArticle}
              editArticle={editArticle}
              tableColumns={tableColumns}
            />
          </div>
        </Container>
      </ArticleContext.Provider>
    </CategoryContext.Provider>
  );
};

export default Dashboard;

export const ArticleContext = React.createContext();
export const CategoryContext = React.createContext();
