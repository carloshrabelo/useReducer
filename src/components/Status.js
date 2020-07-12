import React, { Suspense } from "react";
import PropTypes from "prop-types";

import Spinner from "./Spinner";

const status = ["isLoading", "error", "isEmpty", "content"];

export const LoadingState = (props) => <Spinner {...props} />;
export const ErrorState = ({ retry, className = "" }) => (
  <div className={`alert alert-danger ${className}`} role="alert">
    Something wrong is not right{" "}
    <span role="img" aria-label="Pensative">
      🤔
    </span>
    {retry && (
      <button
        type="button"
        onClick={retry}
        className="btn btn-outline-danger btn-block"
      >
        Try again
      </button>
    )}
  </div>
);

ErrorState.propTypes = {
  className: PropTypes.string,
  retry: PropTypes.func,
};

export const EmptyState = ({ className = "", ...props }) => (
  <div className={`alert alert-info ${className}`} role="alert" {...props}>
    Nothing here
    <span role="img" aria-label="empty">
      📄
    </span>
  </div>
);
EmptyState.propTypes = {
  className: PropTypes.string,
};

const hasData = (data) => {
  if (typeof data === "undefined") return false;
  if (Array.isArray(data)) return Boolean(data.length);
  if (typeof data === "object") return Boolean(Object.keys(data).length);
  return true;
};

const mixData = (props, data) => {
  if (Array.isArray(data)) return { ...props, data };
  if (typeof data === "object") return { ...props, ...data };
  return { ...props, data };
};

export const Status = ({
  isLoading,
  error,
  isEmpty,
  retry,
  loadingState,
  errorState,
  emptyState,
  children,
  render,
  data,
  ...props
}) => {
  const _isEmpty = typeof isEmpty !== "undefined" ? isEmpty : !hasData(data);
  const componentStatus = { isLoading, error, isEmpty: _isEmpty, retry };
  const renderState = {
    isLoading: loadingState || LoadingState,
    error: errorState || ErrorState,
    isEmpty: emptyState || EmptyState,
  };
  const currentState = status.find((state) => componentStatus[state]);
  const componentProps =
    currentState === error ? { ...props, retry } : mixData(props, data);
  const Component = renderState[currentState] || render;
  const ComponentError = renderState.error;

  return Component ? (
    <Suspense fallback={<ComponentError />}>
      <Component {...componentProps} />
    </Suspense>
  ) : (
    children
  );
};

const requiredPropsCheck = ({ render, children }, propName, componentName) =>
  !render &&
  !children &&
  new Error(
    `One of props 'render' or 'children' was not specified in '${componentName}'.`
  );

Status.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
  isEmpty: PropTypes.bool,
  retry: PropTypes.func,
  loadingState: PropTypes.func,
  errorState: PropTypes.func,
  emptyState: PropTypes.func,
  children: requiredPropsCheck,
  render: requiredPropsCheck,
  data: PropTypes.any,
};

export default Status;
