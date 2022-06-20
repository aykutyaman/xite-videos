import { CSSObjectWithLabel } from "react-select";

const customStyles = {
  container: (provided: CSSObjectWithLabel) => {
    return {
      ...provided,
      fontSize: "0.8rem",
      paddingTop: "0px",
      margin: 0,
      padding: 0,
    };
  },
  placeholder: (provided: CSSObjectWithLabel) => {
    return {
      ...provided,
      color: "#b6afaf",
      paddingLeft: "10px",
      fontSize: "0.8rem",
      padding: "1px",
      margin: 0,
    };
  },
};

export default customStyles;
