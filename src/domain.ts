export type VideoId = number;
export type Year = number;
export type GenreId = number;

export type Video = {
  id: VideoId;
  artist: string;
  title: string;
  release_year: number; // TODO: create a branded type
  genre_id: number;
  image_url: string; // TODO: create a branded type
};

export type Genre = {
  id: GenreId;
  name: string;
};

// This type is used to represent runtime type errors and will be populated
// at the boundaries(data coming from the server) of the application.
export type IOError = {
  type: "IOError";
  message: string;
  data: unknown;
};

// Data structure coming from the server
export type RawDataInput = {
  genres: unknown[];
  videos: unknown[];
};

// We change the shape of the data according to our state and populate ioErrors
// if there is any data that is not valid. And put all validated data into
// Videos
export type Normalized = {
  ioErrors: IOError[];
  videos: Videos;
};

// the text typed by the user into search box
export type SearchText = string;

// there is a selected genre
type GenreActive = {
  type: "GenreActive";
  allGenres: Genre[];
  selectedGenres: GenreId[];
};

// the genre selection is passive
type GenrePassive = {
  type: "GenrePassive";
  allGenres: Genre[];
};

export type GenreSelection = GenreActive | GenrePassive;

// the application has loaded but it's not doing anything, yet
export type Idle = {
  type: "Idle";
};

// Data is loading
export type Loading = {
  type: "Loading";
};

// the search input has value, so the user typed some text
type SearchActive = {
  type: "SearchActive";
  result: VideoId[];
};

// the search input has no value
type SearchPassive = {
  type: "SearchPassive";
};

export type Search = SearchActive | SearchPassive;

// the year selection has a value
type YearActive = {
  type: "YearActive";
  year: Year;
};

// the year selection has no value
type YearPassive = {
  type: "YearPassive";
};

export type YearSelection = YearActive | YearPassive;

// each year has an array populated with the videos of that year
export type ListByYear = Record<Year, VideoId[]>;

// each genre has an array populated with the videos of that genre
export type ListByGenre = Record<GenreId, VideoId[]>;

// we used a record to reduce the lookup time to O(1)
export type ById = Record<VideoId, Video>;

// the main structure of our state
export type Videos = {
  type: "Videos";
  byId: ById;
  listByYear: ListByYear;
  listByGenre: ListByGenre;
  resultList: VideoId[]; // videos that we'll display on the screen
  genreSelection: GenreSelection;
  search: Search; // fulltext search
  yearSelection: YearSelection;
};

// TODO: add an error state for the fetch failure
export type State = Idle | Loading | Videos;

export const initialState: State = {
  type: "Idle",
};
