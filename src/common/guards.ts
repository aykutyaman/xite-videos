import { Action } from "../actions";
import { Genre, RawDataInput, Video } from "../domain";
import { assertNeverWithoutThrow } from "./utilities";

// -- TYPE GUARDS --
/*
  These custom type guards are used to validate the data in application boundry. Consider in the future using a library to define them.
  TODO: these type guards are not production ready. So, make them robust, and
  write unit tests
*/

export const isRawDataInput = (value: unknown): value is RawDataInput => {
  const input = value as RawDataInput;
  return (
    typeof value === "object" &&
    "genres" in input &&
    "videos" in input &&
    Array.isArray(input.genres) &&
    Array.isArray(input.videos)
  );
};

export const isGenre = (value: unknown): value is Genre => {
  return (
    typeof value === "object" &&
    typeof (value as Genre).name === "string" &&
    typeof (value as Genre).id === "number"
  );
};

// TODO: what if we add a new property to the Video type?
// We could have an exhaustiveness check for the properties of the Video
export const isVideo = (value: unknown): value is Video => {
  const video = value as Video;
  return (
    typeof value === "object" &&
    typeof video.id === "number" &&
    typeof video.artist === "string" &&
    typeof video.title === "string" &&
    typeof video.release_year === "number" &&
    typeof video.genre_id === "number" &&
    typeof video.image_url === "string"
  );
};

// TODO: move this into a better place
export const isAction = (value: unknown): value is Action => {
  // Check if the action is an application action or not
  // TODO: move this check into a function
  const action = value as Action;
  const actionType =
    typeof value === "object" &&
    typeof action.type === "string" &&
    action.type.substring(0, 5) === "Act::"
      ? action.type
      : "UnknownAction";

  // TODO: We repeat all action types here, manually.
  //       Find a better way to list all actions.
  switch (actionType) {
    case "Act::Fetch":
    case "Act::FetchSuccess":
    case "Act::FetchFailure":
    case "Act::JSONFailure":
    case "Act::SearchChanged":
    case "Act::YearChangedSelected":
    case "Act::YearChangedUnselected":
    case "Act::GenreChangedSelected":
    case "Act::GenreChangedUnselected":
      return true;
    case "UnknownAction": // actions redux dispatched actions
      return false;
    default:
      // TODO: Loggin from a guard function  is not a good idea
      assertNeverWithoutThrow(actionType);
      return false;
  }
};
