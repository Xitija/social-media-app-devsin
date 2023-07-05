import { Link } from "react-router-dom";

import "./Comment.css";

export const Comment = ({ comment }) => {
  console.log(comment, "comment");

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div>
      <div className="comment-section">
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={`/profile/${comment?.handle}`}
        >
          <img
            className="profile-avatar"
            src={comment?.profileAvatar}
            alt={comment?.name}
          />
        </Link>
        {/* <div> */}
        {/* <div className="">
          <div className=""> */}
        <div className="comment-detail">
          <div>
            <span>{comment?.name}</span>
            <span className="comment-date">
              {new Date(comment?.createdAt).toLocaleDateString(
                "en-US",
                options
              )}
            </span>
          </div>
          <span className="comment-user-handle">@{comment?.handle}</span>
        </div>
      </div>
      <div className="comment-content">{comment.comment}</div>
      <hr />
    </div>
    //   </div>
    // </div>
  );
};
