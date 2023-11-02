import { csrfFetch } from "./csrf"

// constants
const SET_USER = "session/SET_USER"
const REMOVE_USER = "session/REMOVE_USER"

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
})

const removeUser = () => ({
	type: REMOVE_USER,
})

// thunks

export const authenticate = () => async (dispatch) => {
	const response = await csrfFetch("/api/auth/")
	if (response.ok) {
		const data = await response.json()
		if (data.errors) return data.errors

		dispatch(setUser(data))
	}
}

export const login = (email, password) => async (dispatch) => {
	const response = await csrfFetch("/api/auth/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			email,
			password,
		}),
	})

	if (response.ok) {
		const data = await response.json()
		dispatch(setUser(data))
		return null
	} else if (response.status < 500) {
		const data = await response.json()
		if (data.errors) return data.errors
	} else return ["An error occurred. Please try again."]
}

export const logout = () => async (dispatch) => {
	const response = await csrfFetch("/api/auth/logout")

	if (response.ok) dispatch(removeUser())
	else return ['Failed to logout.']
}

export const signUp = (
		firstName, lastName, username, email, gender,
		address, city, state, password, profileImage
	) => async (dispatch) => {
	const response = await csrfFetch("/api/auth/signup", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			firstName,
			lastName,
			username,
			email,
			gender,
			address,
			city,
			state,
			password,
			profileImage
		}),
	})

	if (response.ok) {
		const data = await response.json()
		dispatch(setUser(data))
		return null
	} else if (response.status < 500) {
		const data = await response.json()
		if (data.errors) return data.errors
	} else return ["An error occurred. Please try again."]
}

export const updateUser = (
		firstName, lastName, username, email, gender,
		address, city, state, password, profileImage
	) => async (dispatch) => {
	const response = await csrfFetch("/api/session/account", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			firstName,
			lastName,
			username,
			email,
			gender,
			address,
			city,
			state,
			password,
			profileImage
		}),
	})

	if (response.ok) {
		const data = await response.json()
		dispatch(setUser(data))
		return null
	} else if (response.status < 500) {
		const data = await response.json()
		if (data.errors) return data.errors
	} else return ["An error occurred. Please try again."]
}

export const deleteUser = () => async (dispatch) => {
	const response = await csrfFetch("/api/session/account", {
		method: "DELETE",
	})

	if (response.ok) dispatch(removeUser())
	else return ['Failed to delete user.']
}

const initialState = { user: null }

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload }
		case REMOVE_USER:
			return { user: null }
		default:
			return state
	}
}
