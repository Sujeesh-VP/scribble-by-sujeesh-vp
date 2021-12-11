import React, { useState } from "react";

import { Plus, Check } from "@bigbinary/neeto-icons";
import { Typography, Input } from "@bigbinary/neetoui/v2";

import RedirectionTable from "./Table";

const RedirectionsPage = () => {
  const [newRedirection, setNewRedirection] = useState(false);
  return (
    <div className="flex flex-col items-center pt-4">
      <Typography style="h1" className="w-2/3">
        Redirections
      </Typography>
      <Typography style="body1" className="neeto-ui-text-gray-500 pb-4 w-2/3">
        Create and configure redirection rules to send users from old links to
        new links. All redirections are performed with 301 status codes to be
        SEO friendly.
      </Typography>
      <div className=" neeto-ui-bg-pastel-blue w-2/3">
        <RedirectionTable />
        {newRedirection && (
          <div className="flex pl-1 space-x-4 bg-white py-2 mx-8 pr-4">
            <Input placeholder="https://scribble.com" />
            <Input placeholder="https://scribble.com" />
            <Check />
          </div>
        )}
        <Typography
          className="flex pl-8 neeto-ui-text-secondary-indigo py-4"
          onClick={() => setNewRedirection(!newRedirection)}
        >
          <Plus />
          Add New Redirection
        </Typography>
      </div>
    </div>
  );
};

export default RedirectionsPage;
