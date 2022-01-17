import React from "react";
import PostCard from "../Components/PostCard/PostCard";

import request from "../Api/request";

export default function ListPostByUser({ posts }) {
  const [postUser, setPostUser] = React.useState(posts);

  const handleDeletePost = async (value) => {
    if (window.confirm("Bạn có chắc muốn xóa bài viết này?")) {
      const newPosts = postUser.filter((post) => post._id !== value._id);
      setPostUser(newPosts);
      await request({
        url: `/posts/${value._id}`,
        method: "DELETE",
      });
    }
  };

  // const scrollData = async () => {
  //   setLoad(true);
  //   const newSkip = skip + 4;
  //   const data = await fetchPosts(skip);
  //   setPosts((prePosts) => [...prePosts, ...data]);
  //   setSkip(newSkip);
  //   setLoad(false);
  // };
  // console.log(load);

  return (
    <>
      {posts.map((post) => {
        return (
          <div key={post._id} className="mb-3 bg-white p-2 rounded-3">
            <PostCard post={post} handleDeletePost={handleDeletePost} />
          </div>
        );
      })}
    </>
  );
}
