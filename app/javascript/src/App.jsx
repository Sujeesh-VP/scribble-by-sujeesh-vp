import React, { useState, useEffect } from "react";

import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";

import EditArticle from "./components/Article/Edit";
import NewArticle from "./components/Article/New";
import Authentication from "./components/Authentication";
import PrivateRoute from "./components/common/PrivateRoute";
import SettingsProvider from "./components/Contexts/SettingsProvider";
import Dashboard from "./components/Dashboard";
import EndUserInterface from "./components/EndUserInterface";
import EUI from "./components/EndUserInterface/EUI";
import SettingsPage from "./components/Settings";
import { getFromLocalStorage } from "./helpers/storage";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <div className="w-screen h-screen"></div>;
  }

  return (
    <SettingsProvider>
      <Router>
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/article/new" component={NewArticle} />
          <Route exact path="/article/edit" component={EditArticle} />
          <Route exact path="/settings" component={SettingsPage} />
          <Route exact path="/welcome" component={EndUserInterface} />
          <Route exact path="/login" component={Authentication} />
          <Route exact path="/scribble/articles/:slug" component={EUI} />
          <PrivateRoute
            path="/scribble"
            redirectRoute="/login"
            condition={isLoggedIn}
            component={EndUserInterface}
          />
        </Switch>
      </Router>
    </SettingsProvider>
  );
};

export default App;
