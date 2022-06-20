import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { AppDispatch } from "../store";
import customStyles from "../../common/selectCustomStyles";
import { genres as genresSelector } from "../selectors";

const Genres = () => {
  const dispatch = useDispatch<AppDispatch>();

  const genres = useSelector(genresSelector);

  const options = genres.map((genre) => {
    return {
      value: genre.id,
      label: genre.name,
    };
  });

  return (
    <div className="span2">
      <Select
        options={options}
        styles={customStyles}
        isMulti
        isSearchable={true}
        onChange={(genres) => {
          if (genres.length) {
            dispatch({
              type: "Act::GenreChangedSelected",
              selectedGenres: genres.map((g) => g.value),
            });
          } else {
            dispatch({
              type: "Act::GenreChangedUnselected",
            });
          }
        }}
      />
    </div>
  );
};

export default Genres;
