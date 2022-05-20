import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ContextProvider } from "./context/authContext/Context";
import { PostContextProvider } from "./context/postContext/PostContext";
import { UserContextProvider } from "./context/userContext/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <UserContextProvider>
        <PostContextProvider>
          <App />
        </PostContextProvider>
      </UserContextProvider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
