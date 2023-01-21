// import { verifyUser } from "../../utils/API_CALLS";

// export const userStatus = async (dispatch) => {
//   const response = await verifyUser();
//   if (response.status === 200) {
//     dispatch({
//       type: "USER",
//       payload: true,
//     });
//   } else {
//     dispatch({
//       type: "USER",
//       payload: false,
//     });
//   }
// };

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
