// constants

const SET_VIDEOS = "videos/SET_VIDEOS";
const ADD_VIDEO = "videos/ADD_VIDEO";
const REMOVE_VIDEO = "videos/REMOVE_VIDEO";

// action creators

const setVideos = (videos) => ({
  type: SET_VIDEOS,
  payload: videos,
});

const addVideo = (video) => ({
  type: ADD_VIDEO,
  payload: video,
});

const removeVideo = (videoId) => ({
  type: REMOVE_VIDEO,
  payload: videoId,
});

// thunks

// GET /profiles/:profileId/videos/
export const getVideosThunk = (profileId) => async (dispatch) => {
  const response = await fetch(`/api/profiles/${profileId}/videos`);
  if (response.ok) {
    const data = await response.json();
    const formattedData = {};
    for (const video of data) {
      formattedData[video.id] = video;
    }
    dispatch(setVideos(formattedData));
    return formattedData;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to retrieve videos."];
};

// POST /profiles/:profileId/videos/
export const createVideoThunk =
  ({ profileId, name, video }) =>
  async (dispatch) => {
    const response = await fetch(`/api/profiles/${profileId}/videos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        video,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addVideo({ [data.id]: data }));
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) return data.errors;
    } else return ["Failed to create video."];
  };

// PUT /videos/:videoId
export const updateVideoThunk =
  ({ videoId, name }) =>
  async (dispatch) => {
    const response = await fetch(`/api/videos/${videoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addVideo({ [data.id]: data }));
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) return data.errors;
    } else return ["Failed to update video."];
  };

// DELETE /videos/:videoId
export const deleteVideoThunk = (videoId) => async (dispatch) => {
  const response = await fetch(`/api/videos/${videoId}`, {
    method: "DELETE",
  });

  if (response.ok) dispatch(removeVideo(videoId));
  else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to delete video."];
};

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_VIDEOS:
      return { ...action.payload };
    case ADD_VIDEO:
      return { ...state, ...action.payload };
    case REMOVE_VIDEO:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}
