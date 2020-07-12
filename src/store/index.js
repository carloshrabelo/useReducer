import React from "react";
import PropTypes from "prop-types";
import buildStore from "./buildStore";
import StoreContext from "./StoreContext";

const Provider = ({ children }) => {
  const store = buildStore();

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
