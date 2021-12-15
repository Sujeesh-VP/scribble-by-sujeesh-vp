import React, { useState, useEffect } from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";

import EditArticle from "./components/Article/Edit";
import NewArticle from "./components/Article/New";
import Authentication from "./components/Authentication";
import Dashboard from "./components/Dashboard";
import EndUserInterface from "./components/EndUserInterface";
import EUI from "./components/EndUserInterface/EUI";
import SettingsPage from "./components/Settings";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <div className="w-screen h-screen"></div>;
  }

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/article/new" component={NewArticle} />
        <Route exact path="/article/edit" component={EditArticle} />
        <Route exact path="/settings" component={SettingsPage} />
        <Route exact path="/welcome" component={EndUserInterface} />
        <Route exact path="/login" component={Authentication} />
        <Route exact path="/public/articles/:slug" component={EUI} />
      </Switch>
    </Router>
  );
};

export default App;
