import React from "react";
import PropTypes from "prop-types";
const User = ({ avatar, email, first_name, last_name }) => (
  <div className="d-flex rounded shadow p-3">
    <img
      src={avatar}
      className="img-thumbnail rounded-circle"
      alt={`foto do ${first_name}`}
      width="120"
    />
    <div className="d-flex flex-column justify-content-around ml-2">
      <h1 className="mb-0">
        {first_name} {last_name}
      </h1>
      <h3>
        <span role="img" aria-label="mail">
          📧
        </span>{" "}
        {email}
      </h3>
    </div>
  </div>
);

User.propTypes = {
  onClick: PropTypes.func,
  avatar: PropTypes.string,
  email: PropTypes.string,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
};

export default User;
