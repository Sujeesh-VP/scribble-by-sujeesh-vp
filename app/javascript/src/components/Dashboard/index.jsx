import React, { useState, useEffect, useCallback } from "react";

import { Search, Plus } from "@bigbinary/neeto-icons";
import { Input, Dropdown, Button, Typography } from "@bigbinary/neetoui/v2";
import { debounce } from "lodash";

import articlesApi from "../../apis/articles";
import Container from "../common/Container";
import ArticleTable from "../Table";

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("");
  const [inputValue, setInputValue] = useState("");

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
    return <div className="w-screen h-screen"></div>;
  }

  return (
    <CategoryContext.Provider value={[category, setCategory]}>
      <ArticleContext.Provider value={[status, setStatus]}>
        <Container>
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
              <li>Option 1</li>
              <li>Option 2</li>
              <li>Option 3</li>
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
            <ArticleTable articles={articles} />
          </div>
        </Container>
      </ArticleContext.Provider>
    </CategoryContext.Provider>
  );
};

export default Dashboard;

export const ArticleContext = React.createContext();
export const CategoryContext = React.createContext();
