import React, { useEffect, lazy } from "react";
import PropTypes from "prop-types";
import connect from "../../store/connect";
import { find } from "../../store/reducers/user";
import withStatus from "../../hooks/withStatus";

const User = withStatus(lazy(() => import("./User")));

const EmptyState = () => (
  <div className="alert alert-info" role="alert">
    Select the user{" "}
    <span role="img" aria-label="search">
      🔍
    </span>
  </div>
);

export const UserContainer = ({ id, find, data, className, ...props }) => {
  const getUser = (id) => find(id);
  const load = (id) => id && id !== data.id && getUser(id);
  const retry = () => getUser(id);

  useEffect(() => {
    load(id);
  }, [id]);

  return (
    <div className={className}>
      <User {...props} retry={retry} data={data} emptyState={EmptyState} />
    </div>
  );
};

UserContainer.propTypes = {
  find: PropTypes.func,
  id: PropTypes.number,
  data: PropTypes.shape(User.propTypes),
  isLoading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

const mapStateToProps = ({ user }) => user;
const mapDispatchToProps = { find };

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
