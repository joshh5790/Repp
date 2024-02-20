// constants

const SET_RPAGE = "pages/SET_RPAGE";
const ADD_RPAGE = "pages/ADD_RPAGE";

// action creators

const setRPage = (rpage) => ({
  type: SET_RPAGE,
  payload: rpage,
});

const addRPage = (rpage) => ({
  type: ADD_RPAGE,
  payload: rpage,
});

// thunks

// GET /session/page
export const getSessionPageThunk = () => async (dispatch) => {
  const response = await fetch("/api/session/page");
  if (response.ok) {
    const data = await response.json();
    dispatch(addRPage({ [data.linkName]: data }));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to retrieve session page."];
};

// GET /pages/id/:pageId
export const addPageThunk = (pageId) => async (dispatch) => {
  const response = await fetch(`/api/pages/id/${pageId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(addRPage({ [data.linkName]: data }));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to retrieve page."];
};

// GET /pages/id/:pageId
export const getPageByIdThunk = (pageId) => async (dispatch) => {
  const response = await fetch(`/api/pages/id/${pageId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(addRPage({ [data.linkName]: data }));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to retrieve page."];
};

// GET /pages
export const getRPagesThunk = () => async (dispatch) => {
  const response = await fetch("/api/pages");
  if (response.ok) {
    const data = await response.json();
    const formattedData = {};
    for (const page of data) {
      formattedData[page.linkName] = page;
    }
    dispatch(addRPage(formattedData));
    return formattedData;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to retrieve pages."];
};

// GET /pages/home
export const getRPagesHomeThunk = () => async (dispatch) => {
  const response = await fetch("/api/pages/home");
  if (response.ok) {
    const data = await response.json();
    const formattedData = {};
    for (const page of data) {
      formattedData[page.linkName] = page;
    }
    dispatch(addRPage(formattedData));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to retrieve home page information."];
};

// GET /pages/search
export const getRPagesSearchThunk = (query) => async (dispatch) => {
  const response = await fetch(`/api/pages/search?query=${query}`);
  if (response.ok) {
    const data = await response.json();
    const formattedData = {};
    for (const page of data) {
      formattedData[page.linkName] = page;
    }
    dispatch(setRPage(formattedData));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["Failed to retrieve pages."];
}

// GET /pages/:linkName
export const getOneRPageThunk = (linkName) => async (dispatch) => {
  const response = await fetch(`/api/pages/${linkName}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(addRPage({ [data.linkName]: data }));
    return data;
  } else return;
};

// POST /pages
export const createRPageThunk =
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
  }) =>
  async (dispatch) => {
    const response = await fetch("/api/pages/", {
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
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addRPage({ [data.linkName]: data }));
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) return data.errors;
    } else return ["Failed to create page."];
  };

// PUT /pages/:pageId
export const updateRPageThunk =
  ({
    pageId,
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
  }) =>
  async (dispatch) => {
    const response = await fetch(`/api/pages/${pageId}`, {
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
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addRPage({ [data.linkName]: data }));
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) return data.errors;
    } else return ["Failed to update page."];
  };

// DELETE /pages/:pageId
export const deleteRPageThunk = (pageId) => async (dispatch) => {
  const response = await fetch(`/api/pages/${pageId}`, {
    method: "DELETE",
  });

  if (response.ok) dispatch(setRPage({}));
  else return ["Failed to delete page."];
};

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_RPAGE:
      return { ...action.payload };
    case ADD_RPAGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
