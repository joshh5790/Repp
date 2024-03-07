// constants

const SET_PROFILELINKS = "profileLink/SET_PROFILELINKS";
const ADD_PROFILELINK = "profileLink/ADD_PROFILELINK";
const REMOVE_PROFILELINK = "profileLink/REMOVE_PROFILELINK";

// action creators

const setProfileLinks = (profileLinks) => ({
  type: SET_PROFILELINKS,
  payload: profileLinks,
});

const addProfileLink = (profileLink) => ({
  type: ADD_PROFILELINK,
  payload: profileLink,
});

const removeProfileLink = (profileLinkId) => ({
  type: REMOVE_PROFILELINK,
  payload: profileLinkId,
});

// thunks

// GET /profiles/:profileId/profileLinks
export const getProfileLinksThunk = (profileId) => async (dispatch) => {
  const response = await fetch(`/api/profiles/${profileId}/profileLinks`);
  if (response.ok) {
    const data = await response.json();
    const formattedData = {};
    for (const profileLink of data) {
      formattedData[profileLink.id] = profileLink;
    }
    dispatch(setProfileLinks(formattedData));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to retrieve profileLink."];
};

// POST /profiles/:profileId/profileLinks
export const createProfileLinkThunk =
  ({ profileId, venue, location, profileLinkDate, ticketsLink, soldOut, }) =>
  async (dispatch) => {
    const response = await fetch(`/api/profiles/${profileId}/profileLinks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        venue,
        location,
        profileLinkDate,
        ticketsLink,
        soldOut,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addProfileLink({ [data.id]: data }));
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) return data.errors;
    } else return ["Failed to create profileLink."];
  };

// PUT /profileLinks/:profileLinkId
export const updateProfileLinkThunk =
  ({
    profileLinkId,
    venue,
    location,
    profileLinkDate,
    ticketsLink,
    soldOut,
  }) =>
  async (dispatch) => {
    const response = await fetch(`/api/profileLinks/${profileLinkId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        venue,
        location,
        profileLinkDate,
        ticketsLink,
        soldOut,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addProfileLink({ [data.id]: data }));
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) return data.errors;
    } else return ["Failed to update profileLink."];
  };

// DELETE /profileLinks/:profileLinkId
export const deleteProfileLinkThunk = (profileLinkId) => async (dispatch) => {
  const response = await fetch(`/api/profileLinks/${profileLinkId}`, {
    method: "DELETE",
  });

  if (response.ok) dispatch(removeProfileLink(profileLinkId));
  else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to delete profileLink."];
};

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROFILELINKS:
      return { ...action.payload };
    case ADD_PROFILELINK:
      return { ...state, ...action.payload };
    case REMOVE_PROFILELINK:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}
