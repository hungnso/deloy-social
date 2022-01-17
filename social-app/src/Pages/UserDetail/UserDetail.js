import React from "react";
import { useParams } from "react-router-dom";
import FriendsLayout from "../../Components/Layout/FriendsLayout";
import RightLargeSidebarLayout from "../../Components/Layout/RightLargeSidebarLayout";
import ListPosts from "../../Components/ListPosts/ListPosts";
import ProfileUser from "../../Components/ProfileUser/ProfileUser";
import request from "../../Api/request";
import { Tabs, Tab } from "react-bootstrap";
import ListFollow from "../../Components/Follow/ListFollow";
import ListFollower from "../../Components/Follow/ListFollower";
import ListPostByUser from "../../ListPostByUser/ListPostByUser";
import Navbar from "../../Components/Navbar/Navbar";

export default function UserDetail() {
  const params = useParams();
  const { userId } = params;

  const [posts, setPosts] = React.useState([]);

  const fetchPostsByUserId = async () => {
    const res = await request({
      url: `/posts/user/${userId}`,
      method: "GET",
    });
    console.log(res.data);
    setPosts(res.data);
  };

  React.useEffect(() => {
    fetchPostsByUserId();
  }, []);

  const postsNumber = React.useMemo(() => {
    return posts.length;
  });

  return (
    // <FriendsLayout>
    <RightLargeSidebarLayout>
      <Navbar />
      <div className="overflow-auto">
        <ProfileUser userId={userId} postsNumber={postsNumber} />
        <div className="col-8 mx-auto">
          <Tabs
            defaultActiveKey="Posts"
            id="uncontrolled-tab-example"
            className="mb-3 d-flex justify-content-center"
          >
            <Tab eventKey="Posts" title="Posts">
              <ListPostByUser userId={userId} posts={posts} />
            </Tab>
            <Tab eventKey="Follower" title="Follower">
              <ListFollower userIdProfile={userId} page="userDetail-follower" />
            </Tab>
            <Tab eventKey="following" title="Following">
              <ListFollow userIdProfile={userId} page="userDetail-following" />
            </Tab>
          </Tabs>
        </div>
      </div>
    </RightLargeSidebarLayout>
    // </FriendsLayout>
  );
}
