import React, { useState, useEffect } from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { setAuthHeaders } from "apis/axios";

import NewArticle from "./components/Article";
import Dashboard from "./components/Dashboard";

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
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/article/new" component={NewArticle} />
      </Switch>
    </Router>
  );
};

export default App;
