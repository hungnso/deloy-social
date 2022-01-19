import React from "react";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import LeftSidebarLayout from "../../Components/Layout/LeftSidebarLayout";
import ListMenuBar from "../ListMenuBar/ListMenuBar";

export default function FriendsLayout({ children }) {
  return (
    <div
      className="vh-100 d-flex  overflow-hidden"
      style={{ backgroundColor: "#F0F2F5" }}
    >
      <div className="flex-grow-1 d-flex flex-column">
        <div
          className="shadow-sm"
          style={{ height: "7vh", backgroundColor: "#fff" }}
        >
          <Header />
        </div>
        <div className="flex-grow-1 d-flex" style={{ height: "93vh" }}>
         
          {children}
        </div>
      </div>
    </div>
  );
}
