import { useParams } from "react-router-dom"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import './Confirmation.css'

const Confirmation = () => {
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
