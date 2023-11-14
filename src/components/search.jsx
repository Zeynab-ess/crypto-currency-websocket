import React, { memo } from "react";

const Search = memo(({value,onChange}) => {
  return (
    <div className="search-box__container mt-3 w-100">
      <span></span>
      <input
        type="text"
        value={value}
        placeholder="Search"
        name="txtSearch"
        id="Search"
        onChange={onChange}
        className="border shadow-none rounded w-100"
      />
    </div>
  );
});

export default Search;
