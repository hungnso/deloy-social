import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContentLayout from "../../Components/Layout/ContentLayout";
import MainLayout from "../../Components/Layout/MainLayout";
import RightSidebarLayout from "../../Components/Layout/RightSidebarLayout";
import request from "../../Api/request";
import PostCard from "../../Components/PostCard/PostCard";
import Comment from "../../Components/Comment/Comment";
import UserTimeCreateAt from "../../Components/User/UserTimeCreateAt";
import FormComment from "../../Components/FormComment/FormComment";
import { AuthContext } from "../../App";
import UserComment from "../../Components/User/UserComment";
import useAuth from "../../hooks/useAuth";
import socketClient from "../../socket";

export default function PostDetail() {
  const navigate = useNavigate();
  const [post, setPost] = React.useState({});
  const [comments, setComments] = React.useState([]);
  const [profile, setProfile] = React.useState({});
  const user = useAuth();

  const params = useParams();

  const { postId } = params;
  const commentCount = comments.length;

  const fetchDetailPosts = async () => {
    const res = await request({
      url: `/posts/post/${postId}`,
      method: "GET",
    });

    if (res.data) {
      setPost(res.data);
    }
  };

  const fetchComments = async () => {
    const res = await request({
      url: `/comments/post/${postId}`,
      method: "GET",
    });

    if (res.data) {
      setComments(res.data);
    }
  };

  React.useEffect(() => {
    fetchDetailPosts();
  }, []);

  React.useEffect(() => {
    fetchComments();
  }, []);

  React.useEffect(() => {
    socketClient.emit("join-post", postId);
  }, [postId]);

  React.useEffect(() => {
    socketClient.on("newCommentClient", (newComment) => {
      console.log(newComment);
      const newComments = [...comments, newComment];
      setComments(newComments);
    });
  }, [comments]);

  const handleAddComment = async (value) => {
    const incRes = await request({
      url: `/posts/${postId}/incCommentPost`,
      method: "PUT",
    });

    const datapost = { ...incRes.data, userId: user };
    console.log(datapost);
    setPost(datapost);

    const res = await request({
      url: "/comments/create",
      method: "POST",
      data: value,
    });
    const data = { ...res.data, userId: user };
    console.log(data);
    const newComments = [...comments, data];
    setComments(newComments);
    socketClient.emit("newComment", data);
  };
  const handleDeletePost = async (value) => {
    if (window.confirm("Do you want to delete post?")) {
      setPost({});
      await request({
        url: `/posts/${value._id}`,
        method: "DELETE",
      });
    }
    navigate("/");
  };

  return (
    <MainLayout>
      <ContentLayout>
        <div className="flex-grow-1 overflow-auto mt-2">
          <div className="mb-3 bg-white p-2 rounded-3">
            <PostCard post={post} handleDeletePost={handleDeletePost} />
          </div>
        </div>
      </ContentLayout>
      <RightSidebarLayout>
        <div className="text-center my-2">
          {/* <UserComment profile={profile} /> */}
        </div>
        <div className="flex-grow-1 overflow-auto">
          {comments.map((comment) => {
            return (
              <div className="mb-2 d-flex " key={comment._id}>
                <Comment comment={comment} />
              </div>
            );
          })}
        </div>
        <div className="mb-2 d-flex ">
          <FormComment postId={postId} handleAddComment={handleAddComment} />
        </div>
      </RightSidebarLayout>
    </MainLayout>
  );
}
