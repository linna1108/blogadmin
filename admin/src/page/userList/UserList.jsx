import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline,AccountBox } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext, useEffect,useState} from "react";
import { UserContext } from "../../context/userContext/UserContext";
import { getLists } from "../../context/userContext/apiCalls";
import { deleteUser } from "../../context/userContext/apiCalls";


export default function UserList() {
  const { users, dispatch } = useContext(UserContext);
  const PF = "http://localhost:8800/images/";

  
  useEffect(() => {
    getLists(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteUser(id, dispatch);
    window.location.replace();
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "username",
      headerName: "Username",
      width: 150,
    },
    {
      field: "profilePic",
      headerName: "ProfilePic",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="userListItem">
            <img
              className="userListImg"
              src={PF + params.row.profilePic}
              alt=""
            />
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
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
              to={{ pathname: "/user/" + params.row._id, user: params.row }}
            >
              <AccountBox className="userListEdit" />
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
