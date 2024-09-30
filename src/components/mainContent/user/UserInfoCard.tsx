import { IUser } from "@/types/interfaces";
import React, { useEffect, useState } from "react";

const UserInfoCard = () => {
  const [userData, setUserData] = useState<IUser | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        const user: IUser = JSON.parse(storedUserData);
        setUserData(user);
      }
    }
  }, []);
  return (
    <div className="flex flex-col items-center font-bold text-2xl mt-[3vw] bg-[#2a3b3580] p-[2vw] uppercase rounded-2xl">
      <h1>MI PERFIL:</h1>
      <p> NOMBRE: {userData ? userData.name : ""}</p>
      <p> CORREO: {userData ? userData.email : ""}</p>
      <p> DIRECCION: {userData ? userData.address : ""}</p>
      <p> TELEFONO: {userData ? userData.phone : ""}</p>
    </div>
  );
};

export default UserInfoCard;