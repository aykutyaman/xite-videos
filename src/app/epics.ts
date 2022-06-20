import * as r from "rxjs";
import { Epic } from "redux-observable";
import {
  Action,
  Fetch,
  FetchSuccess,
  JSONFailure,
  FetchFailure,
} from "../actions";
import { HTTPError, InvalidJSON } from "../common/utilities";
import { RootState } from "./store";
import * as API from "./services/api";

export const fetchEpic: Epic<Action, Action, RootState, typeof API> = (
  action$,
  _store,
  { fetchVideos }
) =>
  // TODO: create and use type guards for actions
  action$.pipe(
    r.filter((a): a is Fetch => a.type === "Act::Fetch"),
    r.mergeMap(() => r.from(fetchVideos())),
    r.map((payload) => payload),
    r.map((payload): FetchSuccess => ({ type: "Act::FetchSuccess", payload })),
    r.catchError((e) => {
      if (e instanceof InvalidJSON) {
        return r.of<JSONFailure>({
          type: "Act::JSONFailure",
          message: e.message,
        });
      }
      if (e instanceof HTTPError) {
        return r.of<FetchFailure>({
          type: "Act::FetchFailure",
          payload: e.message,
        });
      }
      // TODO: make an unknown error type
      return r.of<JSONFailure>({
        type: "Act::JSONFailure",
        message: e,
      });
    })
  );
