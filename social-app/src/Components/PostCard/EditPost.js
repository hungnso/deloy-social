import { useSelector, useDispatch } from "react-redux";
import request from "../../Api/request";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const EditPost = ({ post, handleDeletePost }) => {
  const baseUrl = process.env.BASE_URL;
  // console.log(handleDeletePost);
  let navigate = useNavigate();
  // const { user, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const user = useAuth();

  const handleEditPost = () => {
    navigate(`/edit-post/${post._id}`);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${baseUrl}/post/${post._id}`);
  };
  return (
    <div className="nav-item dropdown mr-2 ">
      <span className="material-icons" id="moreLink" data-toggle="dropdown">
        more_horiz
      </span>

      <div className="dropdown-menu">
        {user._id === post.userId?._id && (
          <>
            <div className="dropdown-item d-flex " onClick={handleEditPost}>
              <span className="material-icons mr-2">create</span> Edit Post
            </div>
            <div
              className="dropdown-item d-flex "
              onClick={() => handleDeletePost(post)}
            >
              <span className="material-icons mr-2">delete_outline</span> Remove
              Post
            </div>
          </>
        )}

        <div className="dropdown-item d-flex " onClick={handleCopyLink}>
          <span className="material-icons mr-2">content_copy</span> Copy Link
        </div>
      </div>
    </div>
  );
};

export default EditPost;
