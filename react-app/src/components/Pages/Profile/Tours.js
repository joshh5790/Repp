import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Tours.css'
import { getToursThunk } from '../../../store/tours'

const Tours = ({ pageId, previewStyle }) => {
  const dispatch = useDispatch()
  const tours = useSelector(state => state.tours)
  const tourLocations = useSelector(state => state.tourLocations)

  useEffect(() => {
    dispatch(getToursThunk(pageId)).then(data => {

    })
  }, [dispatch, pageId])
 return (
  <div className='repp-page-tours'>
    <h2>TOURS</h2>


  </div>
 )
}

export default Tours
