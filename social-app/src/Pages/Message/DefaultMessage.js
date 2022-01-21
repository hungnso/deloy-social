import React from "react";
import FriendsLayout from "../../Components/Layout/FriendsLayout";
import RightLargeSidebarLayout from "../../Components/Layout/RightLargeSidebarLayout";
import ListUser from "../../Components/ListUser/ListUser";
import LeftSidebarLayout from "../../Components/Layout/LeftSidebarLayout";
import ListMenuBar from "../../Components/ListMenuBar/ListMenuBar";
import ListMessage from "../../Components/ListMessage/ListMessage";
import useAuth from "../../hooks/useAuth";
import request from "../../Api/request";
import { useParams } from "react-router-dom";
import LoadingPage from "../../Components/Loading/LoadingPage";
import ListChat from "../../Components/ListChat/ListChat";
import img from "./images/1.png";
import RightLargeMessage from "../../Components/Layout/RightLargeMessage";

export default function DefaultMessage() {
  const user = useAuth();
  const { userId } = useParams();
  // console.log(userId)
  const [listMessages, setListMessages] = React.useState();

  const fetchListMessages = async () => {
    const res = await request({
      url: "/message/allConversation",
      method: "GET",
    });

    if (res.data) {
      setListMessages(res.data);
    }
  };

  React.useEffect(() => {
    fetchListMessages();
  }, [userId]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <FriendsLayout>
      <LeftSidebarLayout>
        {listMessages ? (
          <ListMessage listMessages={listMessages} userId={userId} />
        ) : (
          <LoadingPage />
        )}
      </LeftSidebarLayout>
      <RightLargeMessage>
        <div className="d-flex justify-content-center align-items-center w-100 h-100">
          <img src={img} alt="img" />
        </div>
      </RightLargeMessage>
    </FriendsLayout>
  );
}
