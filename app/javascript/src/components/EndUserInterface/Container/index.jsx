import React from "react";

import { Typography } from "@bigbinary/neetoui/v2";
import PropTypes from "prop-types";

const EndUserInterfaceContainer = ({ children, siteName }) => {
  return (
    <div>
      <Typography className="text-center py-6 shadow font-bold">
        {siteName}
      </Typography>
      <div className="w-full">{children}</div>
    </div>
  );
};
EndUserInterfaceContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default EndUserInterfaceContainer;
