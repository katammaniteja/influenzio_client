export const login = (dispatch) => {
  dispatch({
    type: "USER",
    payload: true,
  });
};

export const logout = (dispatch) => {
  dispatch({
    type: "USER",
    payload: false,
  });
};
