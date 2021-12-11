import React, { useState } from "react";

import GeneralPage from "./General";
import ManageCategoriesPage from "./Manage Categories";
import RedirectionsPage from "./Redirections";

import Container from "../common/Container";

const SettingsPage = () => {
  const [status, setStatus] = useState("general");

  return (
    <SettingsContext.Provider value={[status, setStatus]}>
      <Container page={"settings"}>
        {status === "general" && <GeneralPage />}
        {status === "redirections" && <RedirectionsPage />}
        {status === "manageCategories" && <ManageCategoriesPage />}
      </Container>
    </SettingsContext.Provider>
  );
};

export default SettingsPage;

export const SettingsContext = React.createContext();
