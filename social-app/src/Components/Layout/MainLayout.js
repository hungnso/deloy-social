import React from "react";
import Header from "../Header/Header";
import ListMenuBar from "../ListMenuBar/ListMenuBar";
import Navbar from "../Navbar/Navbar";
import LeftSidebarLayout from "./LeftSidebarLayout";

export default function MainLayout({ children }) {
  return (
    <div
      className="vh-100 d-flex overflow-hidden"
      style={{ backgroundColor: "#F0F2F5" }}
    >
      {/* <div>
        <Navbar />
      </div> */}
      <div className="flex-grow-1 d-flex flex-column">
        <div
          className="shadow-sm"
          style={{ height: "7vh", backgroundColor: "#fff" }}
        >
          <Header />
        </div>
        <div className="flex-grow-1 d-flex" style={{ height: "93vh" }}>
          <LeftSidebarLayout>
            <ListMenuBar />
          </LeftSidebarLayout>
          {children}
          {/* <ContentLayout>
            {children}
          </ContentLayout>

          <RightSidebarLayout>
            <div>
              chu ngoc thai
            </div>
          </RightSidebarLayout> */}
        </div>
      </div>
    </div>
  );
}
