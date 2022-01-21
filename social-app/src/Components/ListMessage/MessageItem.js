import React from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./message.css";

export default function MessageItem({ message, userId }) {
  console.log(message);
  const messageEnd = message.chat[message.chat.length - 1];
  const navigate = useNavigate();
  const user = useAuth();
  // console.log(userId);
  const member = message.member.find((member) => member._id !== user._id);
  // console.log(member);
  // console.log(member._id, userId);
  return (
    <div
      key={message._id}
      className={
        member._id === userId
          ? "list-group-item messageActive"
          : "list-group-item"
      }
      onClick={() => navigate(`/message/${member._id}`)}
    >
      <div className=" d-flex  w-100">
        <div className="overflow-hidden me-1">
          <img
            className="rounded-circle border border-white"
            style={{ width: "40px", height: "40px", objectFit: "cover" }}
            src={member.avatar}
            alt="user"
          />
        </div>
        <div className="mr-2 item-name">
          <div>
            <b>{member.username}</b>
          </div>
          <small className="text-message" style={{ color: "gray" }}>
            {" "}
            {messageEnd?.content
              ? messageEnd?.content
              : "Giờ đây, bạn có thể nhắn tin !!"}
          </small>
        </div>
      </div>
    </div>
  );
}
