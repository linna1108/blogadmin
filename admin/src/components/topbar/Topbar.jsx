import React from "react";
import "./topbar.css";
import { Logout} from "@mui/icons-material";
import { Context } from "../../context/authContext/Context";
import { useContext,useState } from "react";
import {Link} from "react-router-dom"
import { getLists } from "../../context/userContext/apiCalls";
import axios from "axios";

export default function Topbar() {
  const {dispatch,user} = useContext(Context);
  const [searchText, setSearchText] = useState('');
  const PF = "http://localhost:8800/images/"
  const handleLogout = () =>{
    dispatch({type:"LOGOUT"})
  }
  const handleSearch = async () => {
    try {
      const res = await axios.get(`/users/search/${searchText}`);
      getLists(dispatch);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topbarLeft">
          <span className="logo">Admin Blog</span>
        </div>
        <div className="topbarCenter">
          <input className="searchText" placeholder="Search user" value={searchText} onChange={(e) => setSearchText(e.target.value)}></input>
          <button className="searchbtn" onClick={handleSearch}>Search</button>
        </div>
        <div className="topbarRight">
          <img
            src={PF + user.profilePic}
            alt=""
            className="topAvatar"
          />
          <div className="topbarIconContainer">
          <Link className="link" to="/login">
            <button className="btnLogout" onClick={handleLogout}>
              <Logout/>
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
