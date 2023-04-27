import React from "react";
import headerPic from "../../assests/front_page.png";

const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#000",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <img src={headerPic} alt="main-img" />
    </div>
  );
};

export default Header;
