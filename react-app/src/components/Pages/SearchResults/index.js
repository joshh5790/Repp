import { useSelector, useDispatch} from 'react-redux'
import './SearchResults.css'
import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getRPagesSearchThunk } from '../../../store/pages'

const SearchResults = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const term = queryParams.get('query')
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(getRPagesSearchThunk(term))
  }, [dispatch, location])
  return (
    <div className='page-container'>
      <h2>Search results for <em>{term}</em></h2>
    </div>
  )
}

export default SearchResults
