import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { authenticate } from "../../../store/session"
import OpenModalButton from '../../OpenModalButton'
import DeleteAccount from "../../Modals/DeleteAccount"
import InfoContainer from "./InfoContainer"
import './AccountSettings.css'
import { setNavVisibility } from "../../../store/navigation"

function AccountSettings() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [otherEdit, setOtherEdit] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(setNavVisibility(true))
        restoreUser()
        if (user.id === 1) setOtherEdit(true)
    }, [])

    const changeEditStatus = () => {
        setOtherEdit(prev => !prev)
    }

    const restoreUser = () => {
        setIsLoaded(false)
        dispatch(authenticate())
        .then(() => setIsLoaded(true))
    }

    return (
        <>{isLoaded &&
        <div className="account-settings">
            {user?.id === 1 &&
            <b className="error-msg">
                Can't edit demo user's information
            </b>}
            <h2>Personal Info</h2>
                <InfoContainer
                    label='Legal name'
                    desc='This is the name on your travel document, which could be a license or a passport.'
                    type='name'
                    variables={ {'First Name': user?.firstName, 'Last Name': user?.lastName} }
                    otherEdit={otherEdit}
                    changeOther={changeEditStatus}
                    restoreUser={restoreUser}
                />
                <InfoContainer
                    label='Email address'
                    desc='Use an address you’ll always have access to.'
                    type='email'
                    variables={ {'Email address': user?.email} }
                    otherEdit={otherEdit}
                    changeOther={changeEditStatus}
                    restoreUser={restoreUser}
                />
                <InfoContainer
                    label='Address'
                    desc=''
                    type='address'
                    variables={ {'Address': user?.address, 'City': user?.city, 'State': user?.state } }
                    otherEdit={otherEdit}
                    changeOther={changeEditStatus}
                    restoreUser={restoreUser}
                />
                <InfoContainer
                    label='Profile Image'
                    desc=''
                    type='profileImage'
                    variables={ {'Image URL': user?.profileImage } }
                    otherEdit={otherEdit}
                    changeOther={changeEditStatus}
                    restoreUser={restoreUser}
                />
            <h2>Security</h2>
                <InfoContainer
                    label='Password'
                    desc='Reset password functionality is unavailable so use with caution!'
                    type='password'
                    variables={ {'Old Password': '', 'New Password': '', 'Confirm New Password': ''} }
                    otherEdit={otherEdit}
                    changeOther={changeEditStatus}
                />
            {!otherEdit &&
            <OpenModalButton
                buttonText='Delete Account'
                modalComponent={<DeleteAccount user={user}/>}
                className='delete-account-button button-hover'
            />}
        </div>
        }</>
    )
}

export default AccountSettings
