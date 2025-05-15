import React from "react";
import { Outlet } from "react-router-dom";
// import Sidebar from "../components/SidebarPGOwner"; // optional

const PGOwnerLayout = () => {
  return (
    <div>
      {/* <Sidebar /> */}
      <div className="ml-64 p-4">
        {" "}
        {/* if sidebar is fixed */}
        <Outlet /> {/* This is where nested routes render */}
      </div>
    </div>
  );
};

export default PGOwnerLayout;
