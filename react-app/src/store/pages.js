// constants

const SET_RPAGE = "pages/SET_RPAGE"

// action creators

const setRPage = (rpage) => ({
	type: SET_RPAGE,
	payload: rpage,
})

// thunks

// GET /session/page
export const getSessionPageThunk = () => async (dispatch) => {
  const response = await fetch("/api/session/page")
	if (response.ok) {
		const data = await response.json()
		dispatch(setRPage({ [data.id]: data }))
    return data
	} else if (response.status < 500) {
		const data = await response.json()
		if (data.errors) return data.errors
	} else return ["Failed to retrieve session page."]
}

// GET /pages/
export const getRPagesThunk = () => async (dispatch) => {
  const response = await fetch("/api/pages/")
	if (response.ok) {
		const data = await response.json()
    const formattedData = {}
    for (const page of data) {
      formattedData[page.id] = page
    }
		dispatch(setRPage(formattedData))
    return formattedData
	} else if (response.status < 500) {
		const data = await response.json()
		if (data.errors) return data.errors
	} else return ["Failed to retrieve pages."]
}

// GET /pages/:pageId
export const getOneRPageThunk = (pageId) => async (dispatch) => {
  const response = await fetch(`/api/pages/${pageId}`)
	if (response.ok) {
		const data = await response.json()
		dispatch(setRPage({ [data.id]: data }))
    return data
	} else if (response.status < 500) {
		const data = await response.json()
		if (data.errors) return data.errors
	} else return ["Failed to retrieve page."]
}

// POST /pages/
export const createRPageThunk = (
		displayName, linkName, tiktok, youtube,
    instagram, applemusic, spotify, twitter,
    external, mainImage, isBanner, mainVideo, bio,
    newsletter, businessInquiries, videoSection, shopSection
	) => async (dispatch) => {
	const response = await fetch("/api/pages/", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			displayName, linkName, tiktok, youtube,
      instagram, applemusic, spotify, twitter,
      external, mainImage, isBanner, mainVideo, bio,
      newsletter, businessInquiries, videoSection, shopSection
		}),
	})

	if (response.ok) {
		const data = await response.json()
		dispatch(setRPage({ [data.id]: data }))
		return data
	} else if (response.status < 500) {
		const data = await response.json()
		if (data.errors) return data.errors
	} else return ["Failed to create page."]
}

// PUT /pages/:pageId
export const updateRPageThunk = (
		pageId, displayName, linkName, tiktok, youtube,
    instagram, applemusic, spotify, twitter,
    external, mainImage, isBanner, mainVideo, bio,
    newsletter, businessInquiries, videoSection, shopSection
	) => async (dispatch) => {
	const response = await fetch(`/api/pages/${pageId}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			displayName, linkName, tiktok, youtube,
      instagram, applemusic, spotify, twitter,
      external, mainImage, isBanner, mainVideo, bio,
      newsletter, businessInquiries, videoSection, shopSection
		}),
	})

	if (response.ok) {
		const data = await response.json()
		dispatch(setRPage({ [data.id]: data }))
		return data
	} else if (response.status < 500) {
		const data = await response.json()
    if (data.errors) return data.errors
	} else return ["Failed to update page."]
}

// DELETE /pages/:pageId
export const deleteRPageThunk = (pageId) => async (dispatch) => {
	const response = await fetch(`/api/pages/${pageId}`, {
		method: "DELETE",
	})

	if (response.ok) dispatch(setRPage({}))
	else return ["Failed to delete page."]
}

const initialState = {}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_RPAGE:
			return { ...action.payload }
		default:
			return state
	}
}
