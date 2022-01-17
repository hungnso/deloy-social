import React from "react";
import useAuth from "../../hooks/useAuth";
import Navbar from "../Navbar/Navbar";

export default function Header() {
  const user = useAuth();

  return (
    <div style={{ height: "60px" }} className="">
      <Navbar />
      {/* <h4 className="py-1 px-3">Social App - {user.username}</h4> */}
    </div>
  );
}
