import { SearchText, VideoId, Year, GenreId, Normalized } from "./domain";

/*
 TODO: - move this file into a better place
       - create action creators and use them instead of manually creating
         action objects.
*/

// -- Actions
// the fetch request started
export type Fetch = {
  type: "Act::Fetch";
};

// fetch request resolved with success
export type FetchSuccess = {
  type: "Act::FetchSuccess";
  payload: Normalized;
};

// fetch request failed
export type FetchFailure = {
  type: "Act::FetchFailure";
  payload: string;
};

// the user typed some text into search area
// TODO: make this a union type such as YearSelection, GenreSelection
export type SearchChanged = {
  type: "Act::SearchChanged";
  payload: VideoId[];
  searchText: SearchText;
};

// The user selected a year
export type YearChangedSelected = {
  type: "Act::YearChangedSelected";
  selectedYear: Year;
};

// The user unselected the year selected before
export type YearChangedUnselected = {
  type: "Act::YearChangedUnselected";
};

// The user selected one or more genres
export type GenreChangedSelected = {
  type: "Act::GenreChangedSelected";
  selectedGenres: GenreId[];
};

// The user selected removed genre(s)
export type GenreChangedUnselected = {
  type: "Act::GenreChangedUnselected";
};

// Parsing the json data failed
export type JSONFailure = {
  type: "Act::JSONFailure";
  message: string;
};

export type VideosActions =
  | SearchChanged
  | YearChangedSelected
  | YearChangedUnselected
  | GenreChangedSelected
  | GenreChangedUnselected;

export type Action =
  | Fetch
  | FetchFailure
  | FetchSuccess
  | JSONFailure
  | VideosActions;
