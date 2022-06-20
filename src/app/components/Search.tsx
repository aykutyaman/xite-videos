import { FC } from "react";

type Props = {
  onChange: (value: string) => void;
};

const Search: FC<Props> = ({ onChange }) => {
  return (
    <div className="row">
      {/* Row 0 */}
      <div className="span4">
        <input
          data-testid="searchInput"
          className="searchInput"
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Search;
