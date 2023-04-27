/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { withRouter, Route, Redirect } from "react-router-dom";
import { session } from "../../utils";

const AuthRoute = (props) => {
  if (session.checkIfLogin()) {
    return <Route {...props} />;
  }
  return <Redirect to={{ pathname: "/login" }} />;
};

export default withRouter(AuthRoute);
