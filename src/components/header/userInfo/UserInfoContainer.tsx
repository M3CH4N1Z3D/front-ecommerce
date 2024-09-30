import React from "react";
import UserName from "./UserName";
import UserImage from "./UserImage";
import { IUserInfoProps } from "@/types/interfaces";

const UserInfoContainer: React.FC<IUserInfoProps> = ({
  imagePath,
  altText,
}) => {
  return (
    <div className="flex flex-row justify-center mr-[5vw]">
      <UserName />
      <UserImage imagePath={imagePath} altText={altText} />
    </div>
  );
};
export default UserInfoContainer;
