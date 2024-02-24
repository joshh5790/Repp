import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRPagesSearchThunk } from "../../store/pages";

const SearchResults = ({ term }) => {
  const pages = useSelector((state) => state.pages);
  const [searchTerm, setSearchTerm] = useState(term)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRPagesSearchThunk(term));
  }, [dispatch, term]); // term needs to be a state variable to refresh this component
  return (
    <div className="search-results">
      {pages.length > 0 ? (
        <div className="search-list-artists">
          {pages.map((page) => (
            <NavLink
              to={`/${page?.linkName}`}
              key={page?.id}
              className="page-card"
            >
              <div className="page-image">
                <img src={page?.image} alt="Preview" />
              </div>
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
