// constants

const SET_PROFILE = "profiles/SET_PROFILE";
const ADD_PROFILE = "profiles/ADD_PROFILE";

// action creators

const setProfile = (profile) => ({
  type: SET_PROFILE,
  payload: profile,
});

const addProfile = (profile) => ({
  type: ADD_PROFILE,
  payload: profile,
});

// thunks

// GET /session/profile
export const getSessionProfileThunk = () => async (dispatch) => {
  const response = await fetch("/api/session/profile");
  if (response.ok) {
    const data = await response.json();
    dispatch(addProfile({ [data.linkName]: data }));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to retrieve session profile."];
};

// GET /profiles/id/:profileId
export const addProfileThunk = (profileId) => async (dispatch) => {
  const response = await fetch(`/api/profiles/id/${profileId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(addProfile({ [data.linkName]: data }));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to retrieve profile."];
};

// GET /profiles/id/:profileId
export const getProfileByIdThunk = (profileId) => async (dispatch) => {
  const response = await fetch(`/api/profiles/id/${profileId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(addProfile({ [data.linkName]: data }));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to retrieve profile."];
};

// GET /profiles
export const getProfilesThunk = () => async (dispatch) => {
  const response = await fetch("/api/profiles");
  if (response.ok) {
    const data = await response.json();
    const formattedData = {};
    for (const profile of data) {
      formattedData[profile.linkName] = profile;
    }
    dispatch(addProfile(formattedData));
    return formattedData;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to retrieve profiles."];
};

// GET /profiles/home
export const getProfilesHomeThunk = () => async (dispatch) => {
  const response = await fetch("/api/profiles/home");
  if (response.ok) {
    const data = await response.json();
    const formattedData = {};
    for (const profile of data) {
      formattedData[profile.linkName] = profile;
    }
    dispatch(addProfile(formattedData));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to retrieve home profile information."];
};

// GET /profiles/search
export const getProfilesSearchThunk = (query) => async () => {
  const response = await fetch(`/api/profiles/search?query=${query}`);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to retrieve profiles."];
}

// GET /profiles/:linkName
export const getOneProfileThunk = (linkName) => async (dispatch) => {
  const response = await fetch(`/api/profiles/${linkName}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(addProfile({ [data.linkName]: data }));
    return data;
  } else return;
};

// POST /profiles
export const createProfileThunk =
  ({
    displayName,
    linkName,
    socials,
    mainImage,
    mainVideo,
    bio,
    newsletter,
    businessInquiries,
    videoSection,
    shopSection,
    tourName,
  }) =>
  async (dispatch) => {
    const response = await fetch("/api/profiles/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        displayName,
        linkName,
        ...socials,
        mainImage,
        mainVideo,
        bio,
        newsletter,
        businessInquiries,
        videoSection,
        shopSection,
        tourName,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addProfile({ [data.linkName]: data }));
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) return data.errors;
    } else return ["Failed to create profile."];
  };

// PUT /profiles/:profileId
export const updateProfileThunk =
  ({
    profileId,
    displayName,
    linkName,
    tiktok,
    youtube,
    instagram,
    applemusic,
    spotify,
    facebook,
    discord,
    twitter,
    external,
    mainImage,
    mainVideo,
    bio,
    newsletter,
    businessInquiries,
    videoSection,
    shopSection,
    tourName,
  }) =>
  async (dispatch) => {
    const response = await fetch(`/api/profiles/${profileId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        displayName,
        linkName,
        tiktok,
        youtube,
        instagram,
        applemusic,
        spotify,
        facebook,
        discord,
        twitter,
        external,
        mainImage,
        mainVideo,
        bio,
        newsletter,
        businessInquiries,
        videoSection,
        shopSection,
        tourName,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addProfile({ [data.linkName]: data }));
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) return data.errors;
    } else return ["Failed to update profile."];
  };

// DELETE /profiles/:profileId
export const deleteProfileThunk = (profileId) => async (dispatch) => {
  const response = await fetch(`/api/profiles/${profileId}`, {
    method: "DELETE",
  });

  if (response.ok) dispatch(setProfile({}));
  else return ["Failed to delete profile."];
};

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROFILE:
      return { ...action.payload };
    case ADD_PROFILE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
