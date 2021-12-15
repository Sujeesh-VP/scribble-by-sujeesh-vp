import React, { useContext } from "react";

import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

import { SettingsContext } from "../Contexts/SettingsProvider";

const PrivateRoute = ({
  component: Component,
  condition,
  path,
  redirectRoute,
  ...props
}) => {
  const { passwordPresent } = useContext(SettingsContext);
  if (!condition && passwordPresent) {
    return (
      <Redirect
        to={{
          pathname: redirectRoute,
          from: props.location,
        }}
      />
    );
  }

  return <Route path={path} component={Component} {...props} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  condition: PropTypes.bool,
  path: PropTypes.string,
  redirectRoute: PropTypes.string,
  location: PropTypes.object,
};

export default PrivateRoute;
