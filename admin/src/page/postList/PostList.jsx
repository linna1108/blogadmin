import "./postList.css";
import { DataGrid } from "@material-ui/data-grid";
import { AccountBox, DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { PostContext } from "../../context/postContext/PostContext";
import { deletePost, getPosts } from "../../context/postContext/apiCalls";

export default function PostList() {
  const { posts, dispatch } = useContext(PostContext);
  const PF = "http://localhost:8800/images/"

  useEffect(() => {
    getPosts(dispatch); 
  }, [dispatch]);

  const handleDelete = (id) => {
    deletePost(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "title", 
      headerName: "Title",
      width: 200,
    },
    {
      field: "categories",
      headerName: "Category",
      width: 150,
    },
    {
      field: "photo",
      headerName: "Photo",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="postListItem">
            <img className="postListImg" src={PF + params.row.photo} alt="" />
          </div>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Date",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/post/" + params.row._id, post: params.row }}
            >
            <AccountBox className="postListDetail"/>
            </Link>
            <DeleteOutline
              className="postListDelete" 
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="postList">
      <DataGrid
        rows={posts}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
