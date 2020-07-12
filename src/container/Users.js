import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Connect from "../store/connect";
import { find } from "../store/reducers/users";
import { set as setUser } from "../store/reducers/user";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import Status, { ErrorState } from "../components/Status";

const ListItem = (
  { id, avatar, email, first_name, last_name, onClick },
  key
) => (
  <div
    role="menuitem"
    className="list-group-item list-group-item-action d-flex"
    key={key}
    style={{ cursor: "pointer" }}
    onClick={() => onClick(id)}
  >
    <img
      src={avatar}
      className="img-thumbnail"
      alt={`foto do ${first_name}`}
      width="60"
    />
    <div className="px-2">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">
          {first_name} {last_name}
        </h5>
      </div>
      <p className="mb-1">{email}</p>
    </div>
  </div>
);

ListItem.propTypes = {
  id: PropTypes.number,
  onClick: PropTypes.func,
  avatar: PropTypes.string,
  email: PropTypes.string,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
};

export const Users = ({
  find,
  setUser,
  data = [],
  page,
  pages,
  isLoading,
  pageSize,
  error,
  className = "",
  ...props
}) => {
  useEffect(() => {
    !data.length && find();
  }, []);

  const getUsers = (params) => find({ ...params, pageSize });
  const paginate = (page) => getUsers({ page });
  const retry = () => getUsers({ page });

  const getUser = (id) => setUser(id);

  return (
    <div
      className={`d-flex text-center justify-content-between ${className}`}
      {...props}
    >
      <Status
        isLoading={isLoading}
        error={error}
        isEmpty={!data.length}
        loadingState={() => <Spinner className="flex-grow-1" />}
        errorState={() => (
          <ErrorState
            retry={retry}
            className="d-flex justify-content-center flex-column flex-grow-1"
          ></ErrorState>
        )}
      >
        <div className="list-group list-group-flush overflow-auto">
          {data.map((p, key) => (
            <ListItem {...p} key={key} onClick={getUser} />
          ))}
        </div>
      </Status>
      {Boolean(data.length) && (
        <Pagination page={page} pages={pages} onPaginate={paginate} />
      )}
    </div>
  );
};

Users.propTypes = {
  find: PropTypes.func,
  setUser: PropTypes.func,
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape(ListItem.propTypes)),
  page: PropTypes.number,
  pages: PropTypes.number,
  pageSize: PropTypes.number,
  isLoading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

const mapStateToProps = ({ users }) => users;

export default Connect(mapStateToProps, { find, setUser })(Users);
