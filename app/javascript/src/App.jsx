import React, { useState, useEffect } from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { setAuthHeaders } from "apis/axios";

import EditArticle from "./components/Article/Edit";
import NewArticle from "./components/Article/New";
import Dashboard from "./components/Dashboard";
import SettingsPage from "./components/Settings";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <div className="w-screen h-screen"></div>;
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/article/new" component={NewArticle} />
        <Route exact path="/article/edit" component={EditArticle} />
        <Route exact path="/settings" component={SettingsPage} />
      </Switch>
    </Router>
  );
};

export default App;
