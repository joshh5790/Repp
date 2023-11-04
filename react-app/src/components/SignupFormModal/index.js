import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [gender, setGender] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [profileImage, setProfileImage] = useState("")
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [disableButton, setDisableButton] = useState(true);
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();

	useEffect(() => {
    if (password.length > 5 && confirmPassword.length > 5) {
      setDisableButton(false)
    } else setDisableButton(true)
  }, [password, confirmPassword])

	const handleSubmit = async (e) => {
		e.preventDefault()
		setErrors({})
		if (password === confirmPassword) {
			const errors = await dispatch(signUp(
				firstName, lastName, username, email,
				gender, address, city,
				state, password, profileImage))
			if (errors) setErrors(errors)
			else closeModal()
		} else {
			setErrors(prev => {
				return {...prev, 'confirmPassword': ["Passwords don't match"]}
			})
		}
	};

	return (
		<div className="signup-modal-container">
			<h1 className="modal-header">Sign Up</h1>
			<form className='signup-form' onSubmit={handleSubmit}>
				<div className="signup-col">
					<label className={errors.firstName ? 'error' : 'no-error'}>
						<div>First name *</div>
						<input
							type="text"
							value={firstName}
							onChange={(e) => {
								setErrors(prev => {
									return { ...prev, firstName: null }
								})
								setFirstName(e.target.value)
							}}
							required
						/>
						{errors.firstName && <div className="error-msg">{errors.firstName[0]}</div>}
					</label>
					<label className={errors.lastName ? 'error' : 'no-error'}>
						<div>Last name *</div>
						<input
							type="text"
							value={lastName}
							onChange={(e) => {
								setErrors(prev => {
									return { ...prev, lastName: null }
								})
								setLastName(e.target.value)
							}}
							required
						/>
						{errors.lastName && <div className="error-msg">{errors.lastName[0]}</div>}
					</label>
					<label className={errors.username ? 'error' : 'no-error'}>
						<div>Username *</div>
						<input
							type="text"
							value={username}
							onChange={(e) => {
								setErrors(prev => {
									return { ...prev, username: null }
								})
								setUsername(e.target.value)
							}}
							required
						/>
						{errors.username && <div className="error-msg">{errors.username[0]}</div>}
					</label>
					<label className={errors.email ? 'error' : 'no-error'}>
						<div>Email *</div>
						<input
							type="text"
							value={email}
							onChange={(e) => {
								setErrors(prev => {
									return { ...prev, email: null }
								})
								setEmail(e.target.value)
							}}
							required
						/>
						{errors.email && <div className="error-msg">{errors.email[0]}</div>}
					</label>
				</div>
				<div className="signup-col">
					<label className={errors.gender ? 'error' : 'no-error'}>
						<div>Gender *</div>
						<select
							defaultValue=''
							onChange={e => {
								setErrors(prev => {
									return { ...prev, gender: null }
								})
								setGender(e.target.value)
							}}
							required>
							<option value="" disabled>Select a gender...</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="non-binary">Non-binary</option>
							<option value="other">Other</option>
						</select>
						{errors.gender && <div className="error-msg">{errors.gender[0]}</div>}
					</label>
					<label className={errors.address ? 'error' : 'no-error'}>
						<div>Address *</div>
						<input
							type="text"
							value={address}
							onChange={(e) => {
								setErrors(prev => {
									return { ...prev, address: null }
								})
								setAddress(e.target.value)
							}}
							required
						/>
						{errors.address && <div className="error-msg">{errors.address[0]}</div>}
					</label>
					<label className={errors.city ? 'error' : 'no-error'}>
						<div>City *</div>
						<input
							type="text"
							value={city}
							onChange={(e) => {
								setErrors(prev => {
									return { ...prev, city: null }
								})
								setCity(e.target.value)
							}}
							required
						/>
						{errors.city && <div className="error-msg">{errors.city[0]}</div>}
					</label>
					<label className={errors.state ? 'error' : 'no-error'}>
						<div>State *</div>
						<input
							type="text"
							value={state}
							onChange={(e) => {
								setErrors(prev => {
									return { ...prev, state: null }
								})
								setState(e.target.value)
							}}
							required
						/>
						{errors.state && <div className="error-msg">{errors.state[0]}</div>}
					</label>
				</div>
				<div className="signup-col">

					<label className={errors.profileImage ? 'error' : 'no-error'}>
						<div>Profile Image</div>
						<input
							type="text"
							value={profileImage}
							onChange={(e) => {
								setErrors(prev => {
									return { ...prev, profileImage: null }
								})
								setProfileImage(e.target.value)
							}}
						/>
						{errors.profileImage && <div className="error-msg">{errors.profileImage[0]}</div>}
					</label>
					<label className={errors.password ? 'error' : 'no-error'}>
						<div>Password *</div>
						<input
							type="password"
							value={password}
							onChange={(e) => {
								setErrors(prev => {
									return { ...prev, password: null }
								})
								setPassword(e.target.value)
							}}
							required
						/>
						{errors.password && <div className="error-msg">{errors.password[0]}</div>}
					</label>
					<label className={errors.confirmPassword ? 'error' : 'no-error'}>
						<div>Confirm Password *</div>
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => {
								setErrors(prev => {
									return { ...prev, confirmPassword: null }
								})
								setConfirmPassword(e.target.value)
							}}
							required
						/>
						{errors.confirmPassword && <div className="error-msg">{errors.confirmPassword[0]}</div>}
					</label>
					<button
						type="submit"
						disabled={disableButton}>
							Sign Up
					</button>
				</div>
			</form>
		</div>
	);
}

export default SignupFormModal;
