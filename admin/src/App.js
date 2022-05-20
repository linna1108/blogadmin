import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./page/home/Home";
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";
import UserList from "./page/userList/UserList";
import User from "./page/user/User";

import PostList from "./page/postList/PostList";
import Post from "./page/post/Post";

import Login from "./page/login/Login";
import { Context } from "./context/authContext/Context";
import {useContext} from "react"


function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <Switch>
      <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        {user && (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/users">
                  <UserList />
                </Route>
                <Route path="/user/:userId">
                  <User />
                </Route>
               
                <Route path="/posts">
                  <PostList />
                </Route>
                <Route path="/post/:postId">
                  <Post />
                </Route>
               
              </Switch>
            </div>
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
