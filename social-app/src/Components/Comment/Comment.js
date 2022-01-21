import React from "react";
import momentDisplay from "../../lib/moment";
import { Link } from "react-router-dom";

export default function Comment({ comment }) {
  return (
    <>
      <div className="mb-2 d-flex" style={{ width: "400px" }}>
        <div className=" me-1">
          <Link
            to={`/user/${comment.userId._id}`}
            className="text-dark text-decoration-none"
          >
            <img
              className="rounded-circle border border-white"
              style={{ width: 40, height: 40, objectFit: "cover" }}
              src={comment.userId?.avatar}
              alt="user"
            />
          </Link>
        </div>
        <div className="flex-grow-1 p-2 me-2 bg-white rounded-3">
          <div>
            <Link
              to={`/user/${comment.userId._id}`}
              className="text-dark text-decoration-none"
            >
              <b>{comment.userId?.username}</b>
            </Link>
          </div>
          <p className="mb-1 text-break">{comment.content}</p>
          <small style={{ color: "gray" }}>
            {momentDisplay(comment.createdAt)}
          </small>
        </div>
      </div>
    </>
  );
}
