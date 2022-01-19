import React from "react";
import FriendsLayout from "../../Components/Layout/FriendsLayout";
import RightLargeFriends from "../../Components/Layout/RightLargeFriends";
import RightLargeSidebarLayout from "../../Components/Layout/RightLargeSidebarLayout";
import ListUser from "../../Components/ListUser/ListUser";
import Navbar from "../../Components/Navbar/Navbar";
import LeftSidebarLayout from "../../Components/Layout/LeftSidebarLayout";
import ListMenuBar from "../../Components/ListMenuBar/ListMenuBar";
export default function AddFriends() {
  return (
    <FriendsLayout>
      <LeftSidebarLayout>
        <ListMenuBar />
      </LeftSidebarLayout>
      <RightLargeFriends>
        <ListUser />
      </RightLargeFriends>
    </FriendsLayout>
  );
}
