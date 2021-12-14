import React, { useState } from "react";

import { Check } from "@bigbinary/neeto-icons";
import { Input } from "@bigbinary/neetoui/v2";

import redirectionsApi from "../../../apis/redirections";

function NewRedirection({ newRedirection, setNewRedirection }) {
  const [fromPath, setFromPath] = useState("");
  const [toPath, setToPath] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await redirectionsApi.create({
        redirection: { from_path: fromPath, to_path: toPath },
      });

      setNewRedirection(false);
      setFromPath("");
      setToPath("");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div>
      {newRedirection && (
        <div className="flex pl-1 space-x-4 bg-white py-2 pr-4">
          <Input
            placeholder="https://scribble.com"
            value={fromPath}
            onChange={e => setFromPath(e.target.value)}
          />
          <Input
            placeholder="https://scribble.com"
            value={toPath}
            onChange={e => setToPath(e.target.value)}
          />
          <Check onClick={handleSubmit} />
        </div>
      )}
    </div>
  );
}

export default NewRedirection;
