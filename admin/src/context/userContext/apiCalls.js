import axios from "axios";
import {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  deleteUsersStart,
  deleteUsersSuccess,
  deleteUsersFailure,
} from "./UserActions";
export const getLists = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await axios.get("/users/all", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
};

//delete
export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUsersStart());
  if (window.confirm("Are you sure delete user?")) {
    try {
      await axios.delete("/users/" + id, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      dispatch(deleteUsersSuccess(id));
      window.location.replace();
    } catch (err) {
      dispatch(deleteUsersFailure());
    }
  }
};
