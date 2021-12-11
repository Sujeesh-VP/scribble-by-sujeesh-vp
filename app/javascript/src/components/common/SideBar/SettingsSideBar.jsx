import React, { useContext } from "react";

import { Settings, Repeat, Seo } from "@bigbinary/neeto-icons";
import { MenuBar } from "@bigbinary/neetoui/v2/layouts";

import { SettingsContext } from "../../Settings";

const SettingsSideBar = () => {
  const [status, setStatus] = useContext(SettingsContext);

  return (
    <MenuBar showMenu={true} title="Articles">
      <Settings />
      <MenuBar.Item
        label="General"
        description="Page Title, Brand Name & Meta Description"
        onClick={() => setStatus("general")}
        active={status === "general"}
      />
      <Repeat />
      <MenuBar.Item
        label="Redirections"
        description="Create & configure redirection rules"
        onClick={() => setStatus("redirections")}
        active={status === "redirections"}
      />
      <Seo />
      <MenuBar.Item
        label="Manage categories"
        description="Edit and Reorder KB Structure"
        onClick={() => setStatus("manageCategories")}
        active={status === "manageCategories"}
      />
    </MenuBar>
  );
};

export default SettingsSideBar;
