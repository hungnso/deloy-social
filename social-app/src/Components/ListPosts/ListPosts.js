import React from "react";
import PostCard from "../PostCard/PostCard";
import InfiniteScroll from "react-infinite-scroll-component";
import request from "../../Api/request";
import LoadingPost from "../Loading/LoadingPost";

export default function ListPosts() {
  const [posts, setPosts] = React.useState([]);
  const [skip, setSkip] = React.useState(0);
  const [load, setLoad] = React.useState(false);

  const fetchPosts = async (skip) => {
    setLoad(true);
    const res = await request({
      url: "/posts",
      params: {
        skip: skip,
      },
      method: "GET",
    });
    if (res.data) {
      return res.data;
    }
  };

  const renderPosts = async () => {
    const data = await fetchPosts(skip);
    setLoad(false);
    setPosts(data);
  };

  React.useEffect(() => {
    renderPosts();
  }, []);
  const handleDeletePost = async (value) => {
    if (window.confirm("Bạn có chắc muốn xóa bài viết này?")) {
      const newPosts = posts.filter((post) => post._id !== value._id);
      setPosts(newPosts);
      await request({
        url: `/posts/${value._id}`,
        method: "DELETE",
      });
    }
  };

  const scrollData = async () => {
    setLoad(true);
    const newSkip = skip + 4;
    const data = await fetchPosts(skip);
    setPosts((prePosts) => [...prePosts, ...data]);
    setSkip(newSkip);
    setLoad(false);
  };
  console.log(load);

  return (
    <InfiniteScroll
      dataLength={posts.length} //This is important field to render the next data
      next={scrollData}
      hasMore={true}
      height="800px"
      // loader={<LoadingPost />}
    >
      {posts.map((post) => {
        return (
          <div key={post._id} className="mb-3 bg-white p-2 rounded-3">
            <PostCard
              post={post}
              load={load}
              handleDeletePost={handleDeletePost}
            />
          </div>
        );
      })}
    </InfiniteScroll>
  );
}
