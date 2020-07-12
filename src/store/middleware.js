const middleware = (action) => (dispatch) => {
  const callSelf = (_action) => middleware(_action)(dispatch);
  if (typeof action === "function") return action(callSelf);

  dispatch(action);
};

export default middleware;
