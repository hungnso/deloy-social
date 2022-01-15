import React from "react";
import UserTimeCreateAt from "../../User/UserTimeCreateAt";
import EditPost from "../EditPost";

const HeaderPost = ({ post, handleDeletePost }) => {
  return (
    <div>
      <UserTimeCreateAt post={post} handleDeletePost={handleDeletePost} />
    </div>
  );
};

export default HeaderPost;
