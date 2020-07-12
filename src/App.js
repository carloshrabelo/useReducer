import React from "react";
import Users from "./container/Users";
import User from "./container/User";

const App = () => (
  <div className="d-flex align-items-stretch vh-100">
    <Users
      className="d-flex-sm flex-column shadow"
      style={{ minWidth: "300px" }}
    />
    <User className="d-flex align-content-center flex-wrap flex-grow-1 justify-content-center" />
  </div>
);

export default App;
