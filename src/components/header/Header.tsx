"use client"
import React from "react";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import SocialNetworkContainer from "./SocialNetworkContainer";
import UserInfoContainer from "./userInfo/UserInfoContainer";

const Header = () => {
  return (
    <div className="flex flex-row h-auto w-[80] mt-[1vh] ml-[6vw]">
      <div className="flex flex-col w-[20vw] h-fit justify-center">
        <Logo />
      </div>
      <div className="flex flex-col h-auto max-h-[12vh] w-[40vw] justify-center ml-[7vw]">
        <SearchBar
          onSearch={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <SocialNetworkContainer />
      </div>
      <div className="flex flex-row h-auto max-h-[12vh] w-[32vw] justify-end">
        <UserInfoContainer altText="Usuario" imagePath="/iconos/usuario.png" />
      </div>
    </div>
  );
};

export default Header;
