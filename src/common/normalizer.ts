import { pipe } from "rxjs";
import {
  GenreSelection,
  IOError,
  ListByGenre,
  Normalized,
  ById,
  ListByYear,
  Videos,
} from "../domain";
import { ioError } from "./domainCreators";
import { isRawDataInput, isGenre, isVideo } from "./guards";

// TODO: move this into a better place
export const initialVideos: Videos = {
  type: "Videos",
  byId: {},
  listByYear: {},
  listByGenre: {},
  resultList: [],
  genreSelection: {
    type: "GenrePassive",
    allGenres: [],
  },
  search: {
    type: "SearchPassive",
  },
  yearSelection: {
    type: "YearPassive",
  },
};

// TODO: move this into a better place
type NormalizeGenresReturn = {
  genreSelection: GenreSelection;
  listByGenre: ListByGenre;
  ioErrors: IOError[];
};

// Accumulate genreSelection and listByGenre for a single genre if it's valid.
// If it's not put that into IOErrors
const genreReducer = (
  acc: NormalizeGenresReturn,
  genre: unknown
): NormalizeGenresReturn =>
  isGenre(genre)
    ? {
        ...acc,
        listByGenre: {
          ...acc.listByGenre,
          // Start the genre with an empty array
          [genre.id]: [],
        },
        genreSelection: {
          ...acc.genreSelection,
          // add single genre to to the allGenres
          allGenres: [...acc.genreSelection.allGenres, genre],
        },
      }
    : {
        ...acc,
        ioErrors: [...acc.ioErrors, ioError("Invalid genre", genre)],
      };

const normalizeGenres = (value: unknown[]): NormalizeGenresReturn =>
  value.reduce<NormalizeGenresReturn>(genreReducer, {
    genreSelection: initialVideos.genreSelection,
    listByGenre: {},
    ioErrors: [],
  });

const videoReducer =
  (genres: NormalizeGenresReturn) =>
  (acc: NormalizeVideosReturn, video: unknown): NormalizeVideosReturn => {
    if (isVideo(video)) {
      return {
        ...acc,
        byId: { ...acc.byId, [video.id]: video },
        listByYear: {
          ...acc.listByYear,
          [video.release_year]: acc.listByYear[video.release_year]
            ? [...acc.listByYear[video.release_year], video.id]
            : [video.id],
        },
        listByGenre: {
          ...acc.listByGenre,
          [video.genre_id]: [
            // NOTE: the genre_id taken from the video could not be present in the listByGenre
            // because we build listByGenre looking to the genre data taken from the backend.
            // So if there is any video with a genre_id that is not present in the genre list
            // from the server we create dynamicaly an entry for it to not loose videos.
            // Actually it's the case. We also create an error log for each
            ...(acc.listByGenre[video.genre_id]
              ? acc.listByGenre[video.genre_id]
              : []),
            video.id,
          ],
        },
        ioErrors: [
          ...acc.ioErrors,
          ...(genres.genreSelection.allGenres.find(
            (genre) => genre.id === video.genre_id
          )
            ? []
            : [
                ioError(
                  `genre_id(${video.genre_id}) for video(${video.id}) in not in the genres`,
                  { video, genres: genres.genreSelection.allGenres }
                ),
              ]),
        ],
      };
    } else {
      return {
        ...acc,
        ioErrors: [
          ...acc.ioErrors,
          {
            type: "IOError",
            message: "Video data is not valid",
            data: video,
          } as IOError,
        ],
      };
    }
  };

type NormalizeVideosReturn = {
  byId: ById;
  listByYear: ListByYear;
  listByGenre: ListByGenre;
  ioErrors: IOError[];
};
const normalizeVideos = (
  values: unknown[],
  // listByGenre: ListByGenre // it has only keys, values are empty []
  genres: NormalizeGenresReturn
): NormalizeVideosReturn =>
  values.reduce<NormalizeVideosReturn>(videoReducer(genres), {
    byId: {},
    listByYear: {},
    listByGenre: genres.listByGenre,
    ioErrors: [],
  });

const withProperties = (
  genres: NormalizeGenresReturn,
  videos: NormalizeVideosReturn
): Normalized => {
  return {
    videos: {
      type: "Videos",
      byId: videos.byId,
      listByYear: videos.listByYear,
      listByGenre: videos.listByGenre,
      resultList: [],
      genreSelection: genres.genreSelection,
      search: initialVideos.search,
      yearSelection: initialVideos.yearSelection,
    },
    ioErrors: [...genres.ioErrors, ...videos.ioErrors],
  };
};

const normalizer = (value: unknown): Normalized =>
  isRawDataInput(value)
    ? pipe(
        () => normalizeGenres(value.genres),
        (genres) => [genres, normalizeVideos(value.videos, genres)] as const,
        ([genres, normalizedVideos]) => withProperties(genres, normalizedVideos)
      )(value)
    : {
        ioErrors: [
          ioError("the structure of the response is not valid", value),
        ],
        videos: initialVideos,
      };

export default normalizer;
