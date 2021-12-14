import React, { useEffect, useState } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui/v2";

import NewRedirection from "./NewRedirection";
import RedirectionTable from "./RedirectionTable";

import redirectionsApi from "../../../apis/redirections";

const RedirectionsPage = () => {
  const [newRedirection, setNewRedirection] = useState(false);
  const [redirections, setRedirections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editRedirection, setEditRedirection] = useState("");

  const fetchRedirections = async () => {
    try {
      const response = await redirectionsApi.list();
      setRedirections(response.data.redirections);
      setLoading("");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handleDelete = async id => {
    if (confirm("Are you sure?")) {
      try {
        await redirectionsApi.destroy(id);
        setLoading(false);
        await fetchRedirections();
      } catch (error) {
        logger.error(error);
      }
    }
  };

  const handleEdit = async values => {
    const { editFromPath, editToPath } = values;
    try {
      await redirectionsApi.update({
        id: editRedirection,
        payload: {
          redirection: { from_path: editFromPath, to_path: editToPath },
        },
      });
      setLoading(false);
      setEditRedirection("");
      await fetchRedirections();
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRedirections();
  }, [newRedirection]);

  if (loading) {
    return <div className="w-screen h-screen"></div>;
  }

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
      <div className="neeto-ui-bg-pastel-blue w-2/3 px-4 py-4">
        {redirections.map((item, index) => {
          return (
            <RedirectionTable
              item={item}
              index={index}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              key={index}
              editRedirection={editRedirection}
              setEditRedirection={setEditRedirection}
            />
          );
        })}
        <NewRedirection
          newRedirection={newRedirection}
          setNewRedirection={setNewRedirection}
        />
        {!newRedirection && (
          <Typography
            className="flex neeto-ui-text-secondary-indigo py-4"
            onClick={() => setNewRedirection(!newRedirection)}
          >
            <Plus />
            Add New Redirection
          </Typography>
        )}
      </div>
    </div>
  );
};

export default RedirectionsPage;
