// action creators

export const setNavVisibility = (visible) => ({
	type: 'SET_NAV_VISIBILITY',
	payload: visible
})

export const setSidebarVisibility = (visible) => ({
	type: 'SET_SIDEBAR_VISIBILITY',
	payload: visible
})

// export const setCartVisibility = (visible) => ({
// 	type: 'SET_CART_VISIBILITY',
// 	payload: visible
// })

const initialState = {
  nav: true,
  sidebar: true,
  // cart: false
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case 'SET_NAV_VISIBILITY':
			return { ...state, nav: action.payload }
		case 'SET_SIDEBAR_VISIBILITY':
			return { ...state, sidebar: action.payload }
		// case 'SET_CART_VISIBILITY':
		// 	return { ...state, cart: action.payload }
		default:
			return state
	}
}
