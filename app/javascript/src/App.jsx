import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import NewArticle from "./components/Article";
import Dashboard from "./components/Dashboard";

const App = () => {
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
