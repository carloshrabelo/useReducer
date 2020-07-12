import React, { useEffect, lazy } from "react";
import PropTypes from "prop-types";
import { find } from "../../store/reducers/user";
import useStore from "../../store/hooks/useStore";
import useDispatch from "../../store/hooks/useDispatch";
import Status from "../../components/Status";

const User = lazy(() => import("./User"));

const EmptyState = () => (
  <div className="alert alert-info" role="alert">
    Select the user{" "}
    <span role="img" aria-label="search">
      🔍
    </span>
  </div>
);

export const UserContainer = (props) => {
  const user = useStore().user;
  const dispatch = useDispatch();
  const { id, data } = user;

  const getUser = (id) => dispatch(find(id));
  const load = (id) => id && id !== data.id && getUser(id);
  const retry = () => getUser(id);

  useEffect(() => {
    load(id);
  }, [id]);

  return (
    <div {...props}>
      <Status emptyState={EmptyState} retry={retry} {...user} render={User} />
    </div>
  );
};

UserContainer.propTypes = {
  dispatch: PropTypes.func,
  id: PropTypes.number,
  data: PropTypes.shape(User.propTypes),
  isLoading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default UserContainer;
