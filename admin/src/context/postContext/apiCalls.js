import axios from "axios";
import {
  getPostsStart,
  getPostsSuccess,
  getPostsFailure,
  deletePostFailure,
  deletePostStart,
  deletePostSuccess,
} from "./PostActions";

export const getPosts = async (dispatch) => {
  dispatch(getPostsStart());
  try {
    const res = await axios.get("/posts", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(
      getPostsSuccess(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      )
    );
  } catch (err) {
    dispatch(getPostsFailure());
  }
};

//delete
export const deletePost = async (id, dispatch) => {
  dispatch(deletePostStart());
  if(window.confirm("Are you sure delete post?")){
     try {
    await axios.delete("/posts/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deletePostSuccess(id));
    window.location.replace();
  } catch (err) {
    dispatch(deletePostFailure());
  }
  }
 
};
