"use client";
import React, { useEffect, useState } from "react";
import { useUserContext } from "@/context/UserContext";

const UserName: React.FC = () => {
  const [username, setUsername] = useState("Invitado");
  const { userData } = useUserContext();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, []);

  return (
    <div className="flex flex-col">
      <div className="m-auto mr-[1.5vw] text-[#d7e6bb]">
        Usuario: {userData ? userData.name || username : "Invitado"}
      </div>
    </div>
  );
};

export default UserName;
