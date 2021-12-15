import React from "react";

import { Typography } from "@bigbinary/neetoui/v2";

const ArticleView = ({ articles }) => {
  return (
    <div className="px-8 py-8 w-screen">
      <div>
        <Typography style="h1">{articles[0]}</Typography>
        <div className="flex space-x-4 pb-4 pt-2">
          <Typography className="px-4 bg-blue-100 text-blue-800" style="h5">
            {articles[3]}
          </Typography>
          <Typography style="h5" className="neeto-ui-text-gray-400">
            {articles[2]}
          </Typography>
        </div>
        <div>{articles[1]}</div>
      </div>
    </div>
  );
};

export default ArticleView;
