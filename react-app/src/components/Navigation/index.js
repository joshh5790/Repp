import { useEffect, React } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../../images/repp_name.png'
import { setSidebarVisibility } from '../../store/navigation';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SearchBar from '../SearchBar';
import './Navigation.css';

function Navigation() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
	const navVisible = useSelector(state => state.visibility.nav)
  const location = useLocation()

  useEffect(() => {

  }, [sessionUser, dispatch])

	const setSidebarVisible = (visible) => {
		dispatch(setSidebarVisibility(visible))
	}

  return (
    <ul className={`nav ${navVisible ? '' : 'nav-hidden'}`}>
      <li className='nav-left'>
        <i
          onClick={() => setSidebarVisible(true)}
          className={`fa-solid fa-bars toggle-sidebar`} />
        <NavLink exact to="/" className='logo-link'>
          <img
            src={logo}
            alt='repp'
            className='logo'
          />
        </NavLink>
        <i className="fa-solid fa-info">
          {location.pathname === '/' && <div className='page-info'>
            <h4>Home Page Functionalities</h4>
            <ul>
            </ul>
          </div>}
        </i>
      </li>
      <li className='search-bar-container'>
        <SearchBar />
      </li>

      <li className='nav-right'>
        {sessionUser ? (<div className='nav-button'>
            {<ProfileButton user={sessionUser} />}
          </div>) : (
          <div className="nav-button login">
            <OpenModalButton
              buttonText="Log In"
              modalComponent={<LoginFormModal />}
              className='login-button'
              />
          </div>
        )}
      </li>
    </ul>
  )
}

export default Navigation;
