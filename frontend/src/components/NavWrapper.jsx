import React from "react";
import Sidebar from "./Sidebar";

const NavWrapper = (props) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Sidebar />
      {props.children}
    </div>
  );
};

export default NavWrapper;
