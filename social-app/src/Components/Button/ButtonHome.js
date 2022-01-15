import React from "react";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";
import request from "../../Api/request";
import useAuth from "../../hooks/useAuth";
import socketClient from "../../socket";

export default function ButtonHome({ post, like, commentCount }) {
  const [likes, setLikes] = React.useState(like);

  const user = useAuth();
  const handlexxx = React.useCallback(() => {
    async function handleClickLike() {
      const checkLike = likes?.includes(user._id);
      if (checkLike) {
        await request({
          url: `/posts/${post._id}/unLike`,
          method: "PUT",
        });
        const newLike = likes.filter((like) => like !== user?._id);
        setLikes(newLike);

        socketClient.emit("unlikePost", newLike);
      } else {
        await request({
          url: `/posts/${post._id}/like`,
          method: "PUT",
        });
        const newLike = [...likes, user._id];
        setLikes(newLike);

        socketClient.emit("likePost", newLike);
      }
    }
    handleClickLike();
  }, [likes, post._id, user._id]);

  React.useEffect(() => {
    if (socketClient.connected) {
      socketClient.on("likeToClient", (data) => {
        console.log(data);
        setLikes(data);
      });
    }
    return () => socketClient.off("likeToClient");
  }, []);
  React.useEffect(() => {
    if (socketClient.connected) {
      socketClient.on("unLikeToClient", (data) => {
        console.log(data);

        setLikes(data);
      });
    }
    return () => socketClient.off("unLikeToClient");
  }, []);

  const cls = likes?.includes(user._id)
    ? "btn btn-white text-primary w-50"
    : "btn btn-white w-50";
  return (
    <div className="mt-2 border-top">
      <button className={cls} onClick={handlexxx}>
        {<Icon.ThumbsUp />} {likes ? likes?.length : like?.length}
      </button>
      <Link to={`/posts/${post._id}`}>
        <button className="btn btn-white w-50">
          {<Icon.MessageSquare />} {commentCount}
        </button>
      </Link>
    </div>
  );
}
