import React from "react";
import UserItem from "./UserItem";
import request from "../../Api/request";
import { useDebounce } from "use-debounce";

export default function ListUser() {
  const [users, setUsers] = React.useState([]);
  const [text, setText] = React.useState("");
  const [debouncedValue] = useDebounce(text, 500);
  const [usersDebounce, setUsersDebounce] = React.useState([]);

  const fetchUser = async () => {
    const res = await request({
      url: "/users",
      method: "GET",
    });
    if (res.data) {
      const allUsers = res.data;
      setUsers(allUsers);
    }
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  const fetchDebounce = async () => {
    const res = await request({
      url: "/users/searchUsers",
      method: "POST",
      data: { keyword: debouncedValue },
    });

    const listDebounce = res.data;
    setUsersDebounce(listDebounce);
  };

  React.useEffect(() => {
    fetchDebounce();
  }, [debouncedValue]);

  const renderUser = (users) => {
    return (
      <div className="flex-grow-1 overflow-auto list-group">
        {users.map((user) => {
          return (
            <div
              className="mb-1 d-flex mx-5 list-group-item rounded-3"
              key={user.userId._id}
            >
              <UserItem user={user} page="listuser" />
            </div>
          );
        })}
      </div>
    );
  };

  const renderListUser = () => {
    if (text === "") {
      return renderUser(users);
    } else {
      if (usersDebounce.length === 0) {
        return <p className="text-center">Friend not found</p>;
      } else {
        return renderUser(usersDebounce);
      }
    }
  };

  return (
    <>
      <div className="text-center my-2">
        <h4>Add Friends</h4>
      </div>
      <div className="flex-grow-1 d-flex flex-column overflow-auto mb-5">
        <form
          className="mx-5 mb-3 "
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="form-group">
            <input
              className="form-control"
              value={text}
              placeholder="Enter username"
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </div>
        </form>
        {renderListUser()}
      </div>
    </>
  );
}
