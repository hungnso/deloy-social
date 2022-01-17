import React from "react";
import FriendsLayout from "../../Components/Layout/FriendsLayout";
import RightLargeFriends from "../../Components/Layout/RightLargeFriends";
import RightLargeSidebarLayout from "../../Components/Layout/RightLargeSidebarLayout";
import ListUser from "../../Components/ListUser/ListUser";
import Navbar from "../../Components/Navbar/Navbar";

export default function AddFriends() {
  return (
    <FriendsLayout>
      <RightLargeFriends>
        <ListUser />
      </RightLargeFriends>
    </FriendsLayout>
  );
}
