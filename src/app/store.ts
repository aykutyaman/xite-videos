import { createEpicMiddleware } from "redux-observable";
import { applyMiddleware, createStore, Dispatch } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { State } from "../domain";
import { Action } from "../actions";
import reducer from "./reducers";
import { fetchEpic as epic } from "./epics";
import * as API from "./services/api";

const epicMiddleware = createEpicMiddleware<Action, Action, State>({
  dependencies: API,
});

const composeEnhancers = composeWithDevTools({});

// TODO: use configureStore from redux-toolkit
export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(epic);

// TODO: we don't have type safety here. Find a better way to dispatch the
// initial Fetch.
store.dispatch({
  type: "Act::Fetch",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;
export type AppDispatch = Dispatch<Action>;
