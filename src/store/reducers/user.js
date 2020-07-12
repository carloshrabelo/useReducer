import combineReducers from "../combineReducers";

export const api = "https://reqres.in/api/users";
const delay = 1;

export const initialState = {
  id: null,
  isLoading: false,
  error: false,
  data: {},
};

export const SET = "SET_USER";
export const REQUEST = "REQUEST_USER";
export const FAILURE = "FAILURE_USER";
export const SUCCESS = "SUCCESS_USER";

const id = (state, { type, id }) => (type !== SET ? state : id);

const isLoading = (state, { type }) => {
  const mapping = {
    [SUCCESS]: false,
    [REQUEST]: true,
    [FAILURE]: false,
  };

  return Object.prototype.hasOwnProperty.call(mapping, type)
    ? mapping[type]
    : state;
};

const error = (state, { type, message }) => {
  const mapping = {
    [SUCCESS]: false,
    [REQUEST]: false,
    [FAILURE]: message || true,
  };

  return Object.prototype.hasOwnProperty.call(mapping, type)
    ? mapping[type]
    : state;
};

const data = (state, { type, payload }) => {
  const mapping = {
    [SUCCESS]: payload && payload.data,
    [REQUEST]: {},
    [FAILURE]: state,
  };

  return mapping[type] || state;
};

export const set = (id) => ({
  type: SET,
  id,
});

export const request = (params) => ({
  type: REQUEST,
  params,
});

export const onSuccces = (payload) => ({
  type: SUCCESS,
  payload,
});

export const onError = () => ({
  type: FAILURE,
});

export const find = (id, params = {}) => (dispatch) => {
  const _params = { delay, ...params };
  dispatch(set(id));
  dispatch(request(_params));
  const queryParams = new URLSearchParams(_params).toString();
  return fetch(`${api}/${id}?${queryParams}`)
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then((payload) => dispatch(onSuccces(payload)))
    .catch((err) => dispatch(onError(err)));
};

export default combineReducers({
  id,
  isLoading,
  error,
  data,
});
