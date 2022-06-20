import { memo } from "react";
import Genres from "./Genres";
import Years from "./Years";

const Filters = memo(() => {
  return (
    <div className="row">
      {/* Row 2: 2 boxes, each spanning 2 columns */}
      <Genres />
      <Years />
    </div>
  );
});

export default Filters;
