// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

// thunks

// GET /auth/
export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/");
  if (response.ok) {
    const data = await response.json();
    if (data.errors) return data.errors;

    dispatch(setUser(data));
  } else return ["Failed to authenticate."];
};

// POST /auth/login
export const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return ["Invalid credentials"];
  } else return ["Failed to login."];
};

// GET /auth/logout
export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout");

  if (response.ok) dispatch(removeUser());
  else return ["Failed to logout."];
};

// POST /auth/signup
export const signUp =
  (
    firstName,
    lastName,
    email,
    gender,
    address,
    city,
    state,
    password,
    profileImage
  ) =>
  async (dispatch) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        gender,
        address,
        city,
        state,
        password,
        profileImage,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) return data.errors;
    } else return ["Failed to sign up."];
  };

// PUT /session/account
export const updateUser =
  ({
    firstName,
    lastName,
    email,
    gender,
    address,
    city,
    state,
    password,
    isRepp,
    profileImage,
  }) =>
  async (dispatch) => {
    const response = await fetch("/api/session/account", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        gender,
        address,
        city,
        state,
        password,
        isRepp,
        profileImage,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) return data.errors;
    } else return ["Failed to update user."];
  };

// DELETE /session/account
export const deleteUser = () => async (dispatch) => {
  const response = await fetch("/api/session/account", {
    method: "DELETE",
  });

  if (response.ok) dispatch(removeUser());
  else return ["Failed to delete user."];
};

const initialState = { user: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    default:
      return state;
  }
}
