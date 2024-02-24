import React, { useState, useEffect } from "react";
import DebounceInput from "react-debounce-input";
import { useHistory } from "react-router-dom";
import SearchResults from "./SearchResults";
import "./SearchBar.css";

function SearchBar() {
  const history = useHistory();
  const [term, setTerm] = useState("");

  const clearSearch = (e) => {
    e.preventDefault();
    setTerm("");
  };

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the search term
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={`search-bar`}>
        <DebounceInput
          type="text"
          minLength={1}
          debounceTimeout={500}
          placeholder="Search by artist"
          value={term}
          onChange={handleChange}
          className="search-input"
          style={{ color: "#EEEEEE" }}
        />
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <button type="submit" className="search-button">
            <i
              className="fa-solid fa-magnifying-glass"
              style={{ color: "#EEEEEE", cursor: "pointer" }}
            />
          </button>
          <button
            onClick={clearSearch}
            className={`clear-search ${term.length === 0 ? "hidden" : ""}`}
          >
            <i
              className="fa-solid fa-x"
              style={{ color: "#EEEEEE", cursor: "pointer" }}
            />
          </button>
        </div>
      </form>
      <div
        className={`search-results-div ${term.length === 0 ? "hidden" : ""}`}
      >
        <SearchResults term={term} />
      </div>
    </>
  );
}

export default SearchBar;
