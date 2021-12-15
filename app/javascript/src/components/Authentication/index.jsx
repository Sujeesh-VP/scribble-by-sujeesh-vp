import React from "react";

import { Typography, Input, Button } from "@bigbinary/neetoui/v2";

function Authentication() {
  return (
    <div className="mx-auto self-center w-1/3">
      <Typography style="h2" className="pt-4">
        Spinkart is password protected!
      </Typography>
      <Typography style="body1" className="neeto-ui-text-gray-500 pb-4">
        Enter the password to gain access to spinkart.
      </Typography>
      <Input label="Password" className="pb-4" />
      <Button label="Continue" className="neeto-ui-bg-secondary-indigo" />
    </div>
  );
}

export default Authentication;
