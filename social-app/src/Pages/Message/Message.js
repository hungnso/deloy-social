import React from "react";
import FriendsLayout from "../../Components/Layout/FriendsLayout"
import RightLargeSidebarLayout from "../../Components/Layout/RightLargeSidebarLayout"
import ListUser from "../../Components/ListUser/ListUser"
import LeftSidebarLayout from "../../Components/Layout/LeftSidebarLayout";
import ListMenuBar from "../../Components/ListMenuBar/ListMenuBar"
import ListMessage from '../../Components/ListMessage/ListMessage'
import useAuth from "../../hooks/useAuth"
import request from "../../Api/request";
import { useParams } from "react-router-dom";
import LoadingPage from "../../Components/Loading/LoadingPage";
import ListChat from "../../Components/ListChat/ListChat";

export default function Message() {
  const user = useAuth();
  const { userId } = useParams();
  // console.log(userId)
  const [listMessages, setListMessages] = React.useState()

  const fetchListMessages = async () => {
    const res = await request({
      url: '/message/allConversation',
      method: 'GET',
    })

    if (res.data) {
      setListMessages(res.data)
    }
  }

  React.useEffect(() => {
    fetchListMessages()
  }, [userId])

  return (
    <FriendsLayout>
      <LeftSidebarLayout>
        {listMessages ? (
          <ListMessage
            listMessages={listMessages}
            userId={userId}
          />
        ) : <LoadingPage />}
      </LeftSidebarLayout>
      <RightLargeSidebarLayout>
      {listMessages ? (
          <ListChat
          userId={userId}
          />
        ) : <LoadingPage />}
      </RightLargeSidebarLayout>
    </FriendsLayout>
  )
}