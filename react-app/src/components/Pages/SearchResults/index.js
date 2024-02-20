import { useSelector, useDispatch} from 'react-redux'
import './SearchResults.css'
import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getRPagesSearchThunk } from '../../../store/pages'

const SearchResults = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const term = queryParams.get('query')
  const pages = useSelector(state => state.pages)
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(getRPagesSearchThunk(term))
  }, [dispatch, location])
  return (
    <div className='page-container'>
      <h2>Search results for <em>{term}</em>:</h2>
      {pages.length > 0 ? <div className='search-list-artists'>
        {pages.map(page => (
          <NavLink
          to={`/${page?.linkName}`}
          key={page?.id} className="page-card">
          <div className="page-image">
            <img src={page?.image} alt="Preview" />
          </div>
          <div className="page-info">
          </div>
        </NavLink>
        ))}
      </div> : <div>
        No artists found.
      </div>}
    </div>
  )
}

export default SearchResults
