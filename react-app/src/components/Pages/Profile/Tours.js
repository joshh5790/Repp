// import { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import './Tours.css'
// import { getToursThunk } from '../../../store/tours'

// const Tours = ({ profileId, previewStyle }) => {
//   const dispatch = useDispatch()
//   const tours = useSelector(state => state.tours) // rename tours to tourName, optional
//   const tours = useSelector(state => state.tours) // rename tourlocations to tours
//   // can create tours whenever, add button to clear all tours
//   // tours edit page will have a text bar on top for the title, and underneath is the same just add tour location

//   // each tour will have date top left, venue right under, location center, booking link right, sold out boolean
//   useEffect(() => {
//     dispatch(getToursThunk(profileId)).then(data => {

//     })
//   }, [dispatch, profileId])
//  return (
//   <div className='profile-page-tours'>
//     <h2>TOURS</h2>
//     {tours.map((tour) => <div>

//     </div>)}

//   </div>
//  )
// }

// export default Tours
