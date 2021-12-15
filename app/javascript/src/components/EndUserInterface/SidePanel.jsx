import React from "react";

import { Accordion } from "@bigbinary/neetoui/v2";
import { MenuBar } from "@bigbinary/neetoui/v2/layouts";
import { NavLink } from "react-router-dom";

const SidePanel = ({ categories }) => {
  return (
    <MenuBar showMenu={true}>
      <Accordion>
        {categories.map((item, index) => {
          return (
            <Accordion.Item title={item.name} key={index}>
              <div className="flex flex-col pl-8">
                {item.articles.map((article, number) => {
                  return (
                    <NavLink
                      key={number}
                      to={`/scribble/articles/${article.slug}`}
                      activeClassName="text-indigo-500"
                      className={"text-gray-900"}
                    >
                      {article.title}
                    </NavLink>
                  );
                })}
              </div>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </MenuBar>
  );
};

export default SidePanel;
