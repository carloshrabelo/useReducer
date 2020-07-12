import combineReducers from "../combineReducers";

export const api = "https://reqres.in/api/users";
const delay = 1;
export const initialState = {
  isLoading: false,
  error: false,
  data: [],
  page: 1,
  pageSize: 6,
  pages: 0,
};

export const REQUEST = "REQUEST";
export const FAILURE = "FAILURE";
export const SUCCESS = "SUCCESS";

const pages = (state, { type, payload }) =>
  type !== SUCCESS
    ? state
    : (payload && payload.total_pages) || initialState.total;

const page = (state, { type, params }) =>
  type !== REQUEST ? state : (params && params.page) || initialState.page;
const pageSize = (state, { type, params }) =>
  type !== REQUEST
    ? state
    : (params && params.pageSize) || initialState.pageSize;

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
    [REQUEST]: state,
    [FAILURE]: state,
  };

  return mapping[type] || state;
};

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

export const find = (params = {}) => (dispatch) => {
  const _params = { delay, ...params };
  dispatch(request(_params));
  const queryParams = new URLSearchParams(_params).toString();
  return fetch(`${api}?${queryParams}`)
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then((payload) => dispatch(onSuccces(payload)))
    .catch((err) => dispatch(onError(err)));
};

export default combineReducers({
  isLoading,
  error,
  data,
  page,
  pageSize,
  pages,
});
