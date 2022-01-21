import React from "react";
import MessageItem from "./MessageItem";
import * as Icon from "react-feather";
import useAuth from "../../hooks/useAuth";
import request from "../../Api/request";
import ChatItem from "./ChatItem";
import socketClient from "../../socket";

export default function ListMessage({ userId }) {
  const user = useAuth();
  const [listChat, setListChat] = React.useState([]);
  const [text, setText] = React.useState();
  const [load, setLoad] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [userChat, setUserChat] = React.useState();

  const fetchUser = async () => {
    const res = await request({
      url: "/users",
      method: "GET",
      params: {
        limit: 0,
      },
    });
    if (res.data) {
      const allUsers = res.data;
      setUsers(allUsers);
    }
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  const fetchChat = async () => {
    const res = await request({
      url: `/message/conversation/${userId}`,
      method: "GET",
    });
    console.log(res);

    if (res.data) {
      setListChat(res.data.chat);
    }
  };
  React.useEffect(() => {
    fetchChat();
  }, [userId, load]);

  React.useEffect(() => {
    socketClient.emit("join-message", userId);
  }, [userId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await request({
      url: `/message/chat/${userId}`,
      method: "PUT",
      data: {
        content: text,
      },
    });
    const result = res.data.chat[res.data.chat.length - 1];
    const data = { result, userId };
    // console.log(data[data.length - 1]);
    socketClient.emit("sendMessage", data);
    if (res.data) {
      setLoad(!load);
      setText("");
    }
  };
  React.useEffect(() => {
    socketClient.on("new-message", (message) => {
      const newMessages = [...listChat, message];
      console.log(newMessages);
      setListChat(newMessages);
    });
  }, [listChat]);
  React.useEffect(() => {
    const kq = users.find((user) => user.userId._id === userId);
    setUserChat(kq);
    // console.log(kq);
  }, [userId, users]);

  console.log(listChat);
  return (
    // <div className='mb-2 d-flex flex-column overflow-auto' >
    <>
      <div className=" d-flex  mt-2 header-message">
        <div className="overflow-hidden me-1">
          <img
            className="rounded-circle border border-white"
            style={{ width: "40px", height: "40px", objectFit: "cover" }}
            src={userChat?.userId.avatar}
            alt="user"
          />
        </div>
        <div className="mr-2 item-name">
          <div>
            <b>{userChat?.userId.username}</b>
          </div>
          <small style={{ color: "gray" }}>Đang hoạt động</small>
        </div>
      </div>
      <div className="flex-grow-1 overflow-auto  content-message">
        {listChat?.map((chat, index) => (
          <div
            key={index}
            className={chat.userId?._id === user._id ? "text-right" : ""}
          >
            <ChatItem chat={chat} />
          </div>
        ))}
      </div>
      <div className="d-flex">
        <div className=" me-1">
          <img
            className="rounded-circle border border-white"
            style={{ width: 40, height: 40, objectFit: "cover" }}
            src={user.avatar}
            alt="user"
          />
        </div>
        <div className="flex-grow-1 p-1 rounded me-2 d-flex">
          <form className="d-flex w-100" onSubmit={onSubmit}>
            <input
              className="form-control "
              placeholder="Enter new message"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <button className="btn btn-primary">
              <Icon.Send />
            </button>
          </form>
        </div>
      </div>
    </>
    // </div>
  );
}
