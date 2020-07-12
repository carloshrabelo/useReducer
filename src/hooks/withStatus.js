import React from "react";
import Status from "../components/Status";

export const withStatus = (Component) => (props) => (
  <Status {...props} render={Component} />
);

export default withStatus;
