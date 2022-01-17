import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ButtonAdd from "../Button/ButtonAdd";
import request from "../../Api/request";

export default function FollowItem({ follow, page }) {
  const userMe = useAuth();
  const [statusFollow, setStatusFollow] = React.useState(false);

  const [following, setFollowing] = React.useState([]);
  const fetchFollowId = async () => {
    const res = await request({
      url: `/follows/${userMe._id}`,
      method: "GET",
    });

    if (res.data) {
      setFollowing(res.data.following);
    }
  };

  React.useEffect(() => {
    fetchFollowId();
  }, [statusFollow]);

  const handleClickfollow = async (userId) => {
    const res = await request({
      url: "follows/following",
      method: "PUT",
      data: { userId },
    });
    if (res.data) {
      setStatusFollow(!statusFollow);
    }
  };

  const handleClickUnfollow = async (userId) => {
    const res = await request({
      url: "follows/unfollow",
      method: "PUT",
      data: { userId },
    });
    if (res.data) {
      setStatusFollow(!statusFollow);
    }
  };

  return (
    <>
      <div className="d-flex rounded justify-content-between align-items-center mt-3">
        <div>
          <Link
            to={`/user/${follow._id}`}
            className="text-dark text-decoration-none"
          >
            <div className="d-flex align-items-center">
              <div>
                <img
                  className="rounded-circle border border-white"
                  style={{ width: 40, height: 40, objectFit: "cover" }}
                  src={follow.avatar}
                  alt="user"
                />
              </div>
              <div className="flex-grow-1 ms-2">
                <div>
                  <b>{follow.username}</b>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div>
          <ButtonAdd
            page={page}
            userId={follow._id}
            following={following}
            handleClickfollow={handleClickfollow}
            handleClickUnfollow={handleClickUnfollow}
          />
        </div>
      </div>
    </>
  );
}
