import React from "react";
import momentDisplay from "../../lib/moment";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function ChatItem({ chat }) {
  // console.log(chat);
  const user = useAuth();
  return (
    <span
      className={
        chat.userId?._id === user._id
          ? "mb-2 d-inline-flex flex-row-reverse"
          : "mb-2 d-inline-flex"
      }
    >
      <span className=" me-1">
        <img
          className="rounded-circle border border-white"
          style={{ width: 40, height: 40, objectFit: "cover" }}
          src={chat.userId?.avatar}
          alt="user"
        />
      </span>
      <span
        className={
          chat.userId?._id === user._id
            ? "flex-grow-1 p-2 me-2 rounded-3 bg-primary text-white"
            : "flex-grow-1 p-2 me-2 bg-white rounded-3"
        }
      >
        <span className="mb-1 text-break">{chat.content}</span>
      </span>
    </span>
  );
}
