import normalizer from "../../common/normalizer";
import { HTTPError, InvalidJSON } from "../../common/utilities";
import { Normalized } from "../../domain";
import fetch from "isomorphic-fetch";

export const fetchVideos = (): Promise<Normalized> => {
  // TODO: Create error handling for env file's output and make it typesafe
  const url = process.env.REACT_APP_API_ENDPOINT as string;

  return fetch(url as string, {
    method: "GET",
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new HTTPError(`HTTP response error: ${response.status}`);
      }
      return response;
    })
    .then((response) => {
      return response.json().catch(() => {
        throw new InvalidJSON("Invalid JSON");
      });
    })
    .then(normalizer);
};
