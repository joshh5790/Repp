// constants

const SET_FOLLOWS = "follows/SET_FOLLOWS";
const ADD_FOLLOW = "follows/ADD_FOLLOW";
const REMOVE_FOLLOW = "follows/REMOVE_FOLLOW";

// selectors

export const sessionFollows = (state) => {
  if (!state.session.user) return [];
  const follows = Object.values(state.follows).filter(
    (follow) => follow.userId === state.session.user.id
  );

  return follows;
};

// action creators

const setFollows = (follows) => ({
  type: SET_FOLLOWS,
  payload: follows,
});

const addFollow = (follows) => ({
  type: ADD_FOLLOW,
  payload: follows,
});

const removeFollow = (followId) => ({
  type: REMOVE_FOLLOW,
  payload: followId,
});

// thunks

// GET /session/follows
export const getSessionFollowsThunk = () => async (dispatch) => {
  const response = await fetch("/api/session/follows");
  if (response.ok) {
    const data = await response.json();
    const formattedData = {};
    for (const follow of data) {
      formattedData[follow.id] = follow;
    }
    dispatch(setFollows(formattedData));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to retrieve follows."];
};

// GET /pages/:pageId/follows
export const getFollowsThunk = (pageId) => async (dispatch) => {
  const response = await fetch(`/api/pages/${pageId}/follows`);
  if (response.ok) {
    const data = await response.json();
    const formattedData = {};
    for (const follows of data) {
      formattedData[follows.id] = follows;
    }
    dispatch(setFollows(formattedData));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to retrieve follows."];
};

// POST /pages/:pageId/follows
export const createFollowThunk =
  ({ pageId }) =>
  async (dispatch) => {
    const response = await fetch(`/api/pages/${pageId}/follows`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addFollow({ [data.id]: data }));
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) return data.errors;
    } else return ["Failed to create follow."];
  };

// PUT /follows/:followId
export const updateFollowThunk =
  ({ followId, pepps }) =>
  async (dispatch) => {
    const response = await fetch(`/api/follows/${followId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: {
        pepps,
      },
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addFollow({ [data.id]: data }));
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) return data.errors;
    } else return ["Failed to update follow."];
  };

// DELETE /follows/:followId
export const deleteFollowThunk = (followId) => async (dispatch) => {
  const response = await fetch(`/api/follows/${followId}`, {
    method: "DELETE",
  });

  if (response.ok) dispatch(removeFollow(followId));
  else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to delete follow."];
};

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_FOLLOWS:
      return { ...state, ...action.payload };
    case ADD_FOLLOW:
      return { ...state, ...action.payload };
    case REMOVE_FOLLOW:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}
