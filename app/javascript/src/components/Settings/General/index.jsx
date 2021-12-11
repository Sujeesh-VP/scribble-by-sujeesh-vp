import React, { useState } from "react";

import { Typography, Input, Checkbox, Button } from "@bigbinary/neetoui/v2";

const GeneralPage = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className=" flex flex-col items-center pt-4">
      <div className="w-1/2">
        <div className="border-b-2">
          <Typography style="h1">General Settings</Typography>
          <Typography style="body1" className="neeto-ui-text-gray-500 pb-6">
            Configure general attributes of scribble
          </Typography>
          <Input label="Site Name" />
          <Typography style="body2" className="neeto-ui-text-gray-500">
            Customize the site name which is used to show the site name in
          </Typography>
          <Typography style="body2" className="neeto-ui-text-gray-700 pb-4">
            Open Graph Tags
          </Typography>
        </div>
        <Checkbox
          label="Password Protect Knowledge Base"
          className="py-4"
          onClick={() => setChecked(!checked)}
        />
        {checked && <Input label="Password" className="pb-4 w-1/2" />}
        <div className="flex">
          <Button
            label="Save Changes"
            style="secondary"
            className="neeto-ui-bg-secondary-indigo neeto-ui-text-white"
          />
          <Button label="Cancel" style="text" />
        </div>
      </div>
    </div>
  );
};

export default GeneralPage;
