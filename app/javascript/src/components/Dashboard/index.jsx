import React, { useState, useEffect } from "react";

import { Search, Plus } from "@bigbinary/neeto-icons";
import { Input, Dropdown, Button, Typography } from "@bigbinary/neetoui/v2";

import articlesApi from "../../apis/articles";
import Container from "../common/Container";
import ArticleTable from "../Table";

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const response = await articlesApi.list();
      setArticles(response.data.articles);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return <div className="w-screen h-screen"></div>;
  }

  return (
    <Container>
      <div className="flex space-x-4 justify-end">
        <div className="w-1/3">
          <Input placeholder="Search article title" prefix={<Search />} />
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
        />
      </div>
      <Typography className="pt-4 font-bold">
        {articles.length} Articles
      </Typography>
      <div>
        <ArticleTable articles={articles} />
      </div>
    </Container>
  );
};

export default Dashboard;
