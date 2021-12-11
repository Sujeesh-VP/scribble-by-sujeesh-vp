import React, { useState, useEffect, useCallback, useContext } from "react";

import { Plus, Search, Close, CheckCircle } from "@bigbinary/neeto-icons";
import { Typography, Input } from "@bigbinary/neetoui/v2";
import { MenuBar } from "@bigbinary/neetoui/v2/layouts";
import { debounce } from "lodash";

import articlesApi from "../../../apis/articles";
import categoriesApi from "../../../apis/categories";
import { ArticleContext } from "../../Dashboard";
import { CategoryContext } from "../../Dashboard";

const ArticleSideBar = () => {
  const [status, setStatus] = useContext(ArticleContext);
  const [category, setCategory] = useContext(CategoryContext);
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [isInputCollapsed, setIsInputCollapsed] = useState(true);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState([]);
  const [count, setCount] = useState([]);
  const [name, setName] = useState("");

  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.list();
      setCategories(response.data.categories);
      setDetails(response.data.categories);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const fetchCount = async () => {
    try {
      const response = await articlesApi.show();
      setCount(response.data);
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
    debounceLoadData(value, details);
  };

  const handleSearch = (props, list) => {
    const temp = [];
    list.map(item => {
      if (item?.name?.toLowerCase().includes(props)) {
        temp.push(item);
      }
    });
    setCategories(temp);
  };

  const handleCategory = async event => {
    event.preventDefault();
    try {
      await categoriesApi.create({ category: { name } });
      setLoading(false);
      setIsInputCollapsed(true);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchCount();
  }, [isSearchCollapsed, isInputCollapsed]);

  if (loading) {
    return <div className="w-screen h-screen"></div>;
  }

  return (
    <div className="flex">
      <MenuBar showMenu={true} title="Articles">
        <MenuBar.Block
          label="All"
          count={count.article_count}
          onClick={() => setStatus("all")}
          active={status === "all"}
        />
        <MenuBar.Block
          label="Draft"
          count={count.draft_count}
          onClick={() => setStatus("draft")}
          active={status === "draft"}
        />
        <MenuBar.Block
          count={count.published_count}
          onClick={() => setStatus("published")}
          active={status === "published"}
          label="Published"
        />
        <MenuBar.SubTitle
          iconProps={[
            {
              icon: Search,
              onClick: () => setIsSearchCollapsed(!isSearchCollapsed),
            },
            {
              icon: Plus,
              onClick: () => setIsInputCollapsed(!isInputCollapsed),
            },
            {
              icon: Close,
              onClick: () => setCategory(""),
            },
          ]}
        >
          <Typography
            component="h4"
            style="h5"
            textTransform="uppercase"
            weight="bold"
          >
            Categories
          </Typography>
        </MenuBar.SubTitle>
        <MenuBar.Search
          collapse={isSearchCollapsed}
          onCollapse={() => setIsSearchCollapsed(true)}
          onChange={e => handleFilterChange(e.target.value)}
        />
        {!isInputCollapsed && (
          <Input
            placeholder="Enter Category title"
            onChange={e => setName(e.target.value)}
            suffix={<CheckCircle onClick={handleCategory} color="blue" />}
          />
        )}
        {categories.map((item, index) => {
          return (
            <MenuBar.Block
              label={item.name}
              count={item.count}
              key={index}
              onClick={() => setCategory(item)}
              active={category.name === item.name}
            />
          );
        })}
      </MenuBar>
    </div>
  );
};

export default ArticleSideBar;
