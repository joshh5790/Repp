// constants

const SET_TOURS = "tour/SET_TOURS";
const ADD_TOUR = "tour/ADD_TOUR";
const REMOVE_TOUR = "tour/REMOVE_TOUR";

// action creators

const setTours = (tours) => ({
  type: SET_TOURS,
  payload: tours,
});

const addTour = (tour) => ({
  type: ADD_TOUR,
  payload: tour,
});

const removeTour = (tourId) => ({
  type: REMOVE_TOUR,
  payload: tourId,
});

// thunks

// GET /profiles/:profileId/tours
export const getToursThunk = (profileId) => async (dispatch) => {
  const response = await fetch(`/api/profiles/${profileId}/tours`);
  if (response.ok) {
    const data = await response.json();
    const formattedData = {};
    for (const tour of data) {
      formattedData[tour.id] = tour;
    }
    dispatch(setTours(formattedData));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to retrieve tour."];
};

// POST /profiles/:profileId/tours
export const createTourThunk =
  ({ profileId, venue, location, tourDate, ticketsLink, soldOut, }) =>
  async (dispatch) => {
    const response = await fetch(`/api/profiles/${profileId}/tours`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        venue,
        location,
        tourDate,
        ticketsLink,
        soldOut,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addTour({ [data.id]: data }));
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) return data.errors;
    } else return ["Failed to create tour."];
  };

// PUT /tours/:tourId
export const updateTourThunk =
  ({
    tourId,
    venue,
    location,
    tourDate,
    ticketsLink,
    soldOut,
  }) =>
  async (dispatch) => {
    const response = await fetch(`/api/tours/${tourId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        venue,
        location,
        tourDate,
        ticketsLink,
        soldOut,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addTour({ [data.id]: data }));
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) return data.errors;
    } else return ["Failed to update tour."];
  };

// DELETE /tours/:tourId
export const deleteTourThunk = (tourId) => async (dispatch) => {
  const response = await fetch(`/api/tours/${tourId}`, {
    method: "DELETE",
  });

  if (response.ok) dispatch(removeTour(tourId));
  else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to delete tour."];
};

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOURS:
      return { ...action.payload };
    case ADD_TOUR:
      return { ...state, ...action.payload };
    case REMOVE_TOUR:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}
