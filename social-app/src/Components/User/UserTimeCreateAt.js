import React from "react";
import { Link } from "react-router-dom";
import momentDisplay from "../../lib/moment";
import EditPost from "../PostCard/EditPost";

export default function UserTimeCreateAt({ post, handleDeletePost }) {
  return (
    <div className="header-post">
      <Link
        to={`/user/${post.userId?._id}`}
        className="text-dark text-decoration-none"
      >
        <div className="mb-2 d-flex justify-content-start">
          <div className="overflow-hidden me-1">
            <img
              className="rounded-circle border border-white"
              style={{ width: 50, height: 50, objectFit: "cover" }}
              src={post.userId?.avatar}
              alt="user"
            />
          </div>
          <div>
            <div>
              <b>{post.userId?.username}</b>
            </div>
            <small style={{ color: "gray" }}>
              {momentDisplay(post.createdAt)}
            </small>
          </div>
        </div>
      </Link>
      <EditPost post={post} handleDeletePost={handleDeletePost} />
    </div>
  );
}
