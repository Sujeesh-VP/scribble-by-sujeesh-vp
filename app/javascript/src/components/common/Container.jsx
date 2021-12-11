import React from "react";

import PropTypes from "prop-types";

import NavBar from "./NavBar";
import ArticleSideBar from "./SideBar/ArticleSideBar";
import SettingsSideBar from "./SideBar/SettingsSideBar";

const Container = ({ children, page }) => {
  return (
    <>
      <NavBar />
      <div className="flex">
        {page === "dashboard" && <ArticleSideBar />}
        {page === "settings" && <SettingsSideBar />}
        <div className="w-full px-4 py-4">{children}</div>
      </div>
    </>
  );
};
Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
