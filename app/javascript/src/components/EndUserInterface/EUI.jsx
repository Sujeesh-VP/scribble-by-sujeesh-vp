import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import ArticleView from "./ArticleView";
import EndUserInterfaceContainer from "./Container";
import SidePanel from "./SidePanel";

import articlesApi from "../../apis/articles";
import categoriesApi from "../../apis/categories";
import siteSettingsApi from "../../apis/siteSettings";

const EUI = () => {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [siteName, setSiteName] = useState("");
  const { slug } = useParams();

  const fetchSiteSettings = async () => {
    try {
      const response = await siteSettingsApi.show();
      setSiteName(response.data.site_name);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.userList();
      setCategories(response.data.categories);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const fetchArticles = async slug => {
    try {
      const response = await articlesApi.display(slug);
      setArticles(response.data);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchArticles(slug);
    fetchSiteSettings();
  }, [slug]);

  if (loading) {
    return <div className="w-screen h-screen"></div>;
  }

  return (
    <EndUserInterfaceContainer siteName={siteName}>
      <div className="flex">
        <SidePanel categories={categories} />
        <ArticleView articles={Object.values(articles)} />
      </div>
    </EndUserInterfaceContainer>
  );
};

export default EUI;
