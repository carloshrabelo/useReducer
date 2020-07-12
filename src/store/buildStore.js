import { useReducer, useMemo } from "react";

import middleware from "./middleware";

import rootReducer from "./reducers";
import initialStore from "./initialStore";

export default () => {
  const [store, dispatch] = useReducer(rootReducer, initialStore);
  const useMiddleware = (action) => middleware(action)(dispatch);
  const _store = useMemo(() => ({ store, dispatch: useMiddleware }), [store]);

  return _store;
};
