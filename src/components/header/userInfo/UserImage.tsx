"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import UserMenu from "@/components/userMenu/UserMenu";
import { IUserImageProps } from "@/types/interfaces";

const UserImage: React.FC<IUserImageProps> = ({ imagePath, altText }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const userFormsRef = useRef<HTMLDivElement>(null);

  const handleImageClick = () => {
    setShowMenu(!showMenu);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      userFormsRef.current &&
      !userFormsRef.current.contains(event.target as Node)
    ) {
      setShowMenu(false);
    }
  };

  const handleCloseMenuClick = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="UserImageContainer relative inline-block w-[10vw]"
      ref={menuRef}
    >
      <Image
        className="h-15 max-h-[20vh] w-[7vw] m-[1.5%]"
        src={imagePath}
        alt={altText}
        width={100}
        height={100}
        onClick={handleImageClick}
      />
      {showMenu && (
        <div
          className={`absolute top-50 left-0 z-20 w-170 ${
            showMenu ? "" : "hidden"
          }`}
        >
          <UserMenu
            userFormsRef={userFormsRef}
            onButtonClick={handleCloseMenuClick}
          />
        </div>
      )}
    </div>
  );
};

export default UserImage;
