// constants

const SET_TOURLOCATIONS = "tourLocation/SET_TOURLOCATIONS";
const ADD_TOURLOCATION = "tourLocation/ADD_TOURLOCATION";
const REMOVE_TOURLOCATION = "tourLocation/REMOVE_TOURLOCATION";

// action creators

const setTourLocations = (tourLocations) => ({
  type: SET_TOURLOCATIONS,
  payload: tourLocations,
});

const addTourLocation = (tourLocation) => ({
  type: ADD_TOURLOCATION,
  payload: tourLocation,
});

const removeTourLocation = (tourLocationId) => ({
  type: REMOVE_TOURLOCATION,
  payload: tourLocationId,
});

// thunks

// GET /tours/:tourId/tourLocation
export const getTourLocationsThunk = (tourId) => async (dispatch) => {
  const response = await fetch(`/api/tours/${tourId}/tourLocation`);
  if (response.ok) {
    const data = await response.json();
    const formattedData = {};
    for (const tourLocation of data) {
      formattedData[tourLocation.id] = tourLocation;
    }
    dispatch(setTourLocations(formattedData));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to retrieve tour location."];
};

// POST /tours/:tourId/tourLocation
export const createTourLocationThunk =
  ({ tourId, venue, location, tourDate, ticketsLink, rsvpLink, faqLink }) =>
  async (dispatch) => {
    const response = await fetch(`/api/tours/${tourId}/tourLocation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        venue,
        location,
        tourDate,
        ticketsLink,
        rsvpLink,
        faqLink,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addTourLocation({ [data.id]: data }));
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) return data.errors;
    } else return ["Failed to create tour location."];
  };

// PUT /tourLocation/:tourLocationId
export const updateTourLocationThunk =
  ({
    tourLocationId,
    venue,
    location,
    tourDate,
    ticketsLink,
    rsvpLink,
    faqLink,
  }) =>
  async (dispatch) => {
    const response = await fetch(`/api/tourLocations/${tourLocationId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        venue,
        location,
        tourDate,
        ticketsLink,
        rsvpLink,
        faqLink,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addTourLocation({ [data.id]: data }));
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) return data.errors;
    } else return ["Failed to update tour location."];
  };

// DELETE /tourLocation/:tourLocationId
export const deleteTourLocationThunk = (tourLocationId) => async (dispatch) => {
  const response = await fetch(`/api/tourLocations/${tourLocationId}`, {
    method: "DELETE",
  });

  if (response.ok) dispatch(removeTourLocation(tourLocationId));
  else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to delete tour location."];
};

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOURLOCATIONS:
      return { ...action.payload };
    case ADD_TOURLOCATION:
      return { ...state, ...action.payload };
    case REMOVE_TOURLOCATION:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}
