const initialState = sessionStorage.getItem("jwttoken") ? true : false;

export const authReducer = (prevState = initialState, action) => {
  const { type, payload } = action;
  if (type === "USER") {
    return payload;
  }
  return prevState;
};
