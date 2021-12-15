import React from "react";

import { ExternalLink } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";
import { Header } from "@bigbinary/neetoui/v2/layouts";

const NavBar = () => {
  const handleClick = () => {
    window.open("/scribble", "_blank");
  };

  return (
    <Header
      className="shadow"
      actionBlock={
        <Button
          label="Preview"
          icon={ExternalLink}
          iconPosition="right"
          style="secondary"
          size="large"
          className="mr-6"
          onClick={() => handleClick()}
        />
      }
      title={
        <div className="flex space-x-4 ml-6">
          <Button
            style="link"
            label="Scribble"
            className="neeto-ui-text-black"
          />
          <Button
            style="link"
            label="Article"
            className="neeto-ui-text-black"
            to={"/"}
          />
          <Button
            style="link"
            label="Settings"
            className="neeto-ui-text-black"
            to={"/settings"}
          />
        </div>
      }
    />
  );
};

export default NavBar;
