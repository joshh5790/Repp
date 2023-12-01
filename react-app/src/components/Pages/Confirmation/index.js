import { useParams, NavLink } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { setNavVisibility } from "../../../store/navigation"
import './Confirmation.css'

const Confirmation = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setNavVisibility(true))
  })
  const { linkName } = useParams()
  return (<div className="page-container">
    <div className="confirmation-text flex-col-center">
    <h1>Thank You!</h1>
    <p>Your order has been placed successfully.</p>
    <NavLink className="confirmation-orders-link button-hover" to='/account/orders'>Track Your Orders</NavLink>
    <NavLink className="confirmation-artist-link button-hover" to={`/${linkName}`}>Return to Artist Page</NavLink>
    </div>
  </div>)
}

export default Confirmation
