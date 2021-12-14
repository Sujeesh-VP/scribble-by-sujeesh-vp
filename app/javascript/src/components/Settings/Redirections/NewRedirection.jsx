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
            error={fromPath.trim().length === 0 && "Please enter From path"}
          />
          <Input
            placeholder="https://scribble.com"
            value={toPath}
            onChange={e => setToPath(e.target.value)}
            error={toPath.trim().length === 0 && "Please enter To path"}
          />
          {fromPath.trim().length !== 0 && toPath.trim().length !== 0 && (
            <Check onClick={handleSubmit} />
          )}
        </div>
      )}
    </div>
  );
}

export default NewRedirection;
