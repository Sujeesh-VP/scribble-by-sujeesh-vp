import React from "react";

import PropTypes from "prop-types";

import NavBar from "./NavBar";
import SideBar from "./SideBar";

const Container = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="flex">
        <SideBar />
        <div className="w-full px-4 py-4">{children}</div>
      </div>
    </>
  );
};
Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
