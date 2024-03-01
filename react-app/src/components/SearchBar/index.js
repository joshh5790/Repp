import React, { useState, useEffect, useRef } from "react";
import DebounceInput from "react-debounce-input";
import { useHistory } from "react-router-dom";
import SearchResults from "./SearchResults";
import "./SearchBar.css";

function SearchBar() {
  const history = useHistory();
  const [term, setTerm] = useState("");
  const ref = useRef(null)

  const clearSearch = (e) => {
    e.preventDefault();
    setTerm("");
  };

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  const focusInput = () => {
    const input = document.getElementById("search-input")
    input.focus()
  }

  return (
    <>
      <form onClick={focusInput} className={`search-bar`}>
        <DebounceInput
          type="text"
          id="search-input"
          minLength={1}
          debounceTimeout={500}
          placeholder="Search by artist"
          value={term}
          onChange={handleChange}
        />
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <i className="fa-solid fa-magnifying-glass" />
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
        <SearchResults term={term} setTerm={setTerm} />
      </div>
    </>
  );
}

export default SearchBar;
