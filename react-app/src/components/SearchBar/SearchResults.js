import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfilesSearchThunk } from "../../store/profiles";
import "./SearchResults.css";

const SearchResults = ({ term, setTerm }) => {
  const dispatch = useDispatch();
  const [pages, setPages] = useState([]);
  useEffect(() => {
    dispatch(getProfilesSearchThunk(term)).then((data) => setPages(data));
  }, [dispatch, term]);

  return (
    <div style={{ width: "100%" }}>
      {pages.length > 0 ? (
        <div>
          {pages.map((page) => (
            <NavLink
              to={`/${page?.linkName}`}
              key={page?.id}
              className="search-results-button button-hover"
              onClick={() => setTerm("")}
            >
              <img
                className="search-results-img"
                src={page?.profileImage}
                alt="Preview"
              />
              <div>{page?.displayName}</div>
            </NavLink>
          ))}
        </div>
      ) : (
        <div>No artists found.</div>
      )}
    </div>
  );
};

export default SearchResults;
