import React from "react";
import StoreContext from "./StoreContext";

const returnPropsAsDefault = () => ({});
const doMapDispatchToProps = (dispatch) => (mapDispatchToProps) => {
  return !mapDispatchToProps
    ? { dispatch }
    : Object.entries(mapDispatchToProps).reduce(
        (acc, [prop, fn]) => ({
          ...acc,
          [prop]: (...args) => dispatch(fn(...args)),
        }),
        {}
      );
};

const Connect = (
  mapStateToProps = returnPropsAsDefault,
  mapDispatchToProps
) => (Component) => (props) => (
  <StoreContext.Consumer>
    {({ dispatch, store }) => {
      const storeProps = mapStateToProps(store);
      const dispatchersProps =
        typeof mapDispatchToProps === "function"
          ? mapDispatchToProps(dispatch)
          : doMapDispatchToProps(dispatch)(mapDispatchToProps);
      return <Component {...storeProps} {...props} {...dispatchersProps} />;
    }}
  </StoreContext.Consumer>
);

export default Connect;
