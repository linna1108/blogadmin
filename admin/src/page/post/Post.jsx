
import "./post.css";
import { useLocation } from "react-router-dom";

export default function Post() {
  const location = useLocation();
  const post = location.post;
  const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
      <div className="postTitleContainer">
        <h1 className="postTop">Post detail</h1>
      </div>

      <div className="postBottom">
        <div className="postDetail">         
            <img className="postImg"
            src = {PF + post.photo}
            alt=""
            />
          <div className="postTitle">
            {post.title}
          </div>
          <div className="postId">Id: {post._id}</div>
          <div className="postCategories">Category: {post.categories}</div>
          <div className="postAuth">Post by: {post.username} on {post.createdAt}</div>
          <div className="postDesc">{post.desc}</div>
        </div>
      </div>
    </div>
  );
}
