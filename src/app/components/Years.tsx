import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { eqArray, eqNumber } from "../../common/Eq";
import Select from "react-select";
import customStyles from "../../common/selectCustomStyles";
import { years as yearsSelector } from "../selectors";

const Years = () => {
  const dispatch = useDispatch<AppDispatch>();
  const years = useSelector(yearsSelector, eqArray(eqNumber).equals);

  const options = years.map((year) => {
    return {
      value: year,
      label: year,
    };
  });

  return (
    <div className="span2">
      <Select
        styles={customStyles}
        options={options}
        isClearable={true}
        onChange={(e) => {
          if (e) {
            dispatch({
              type: "Act::YearChangedSelected",
              selectedYear: e.value,
            });
          } else {
            dispatch({
              type: "Act::YearChangedUnselected",
            });
          }
        }}
      />
    </div>
  );
};

export default Years;
