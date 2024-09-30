"use client";
import React from "react";
import GeneralButton from "../buttons/GeneralButton";
import { useRouter } from "next/navigation";

const NavBar: React.FC = () => {
  const router = useRouter();

  const handleButtonClick = (buttonName: string) => {
    if (buttonName) {
      router.push(`/${buttonName}`);
    }
  };

  return (
    <div className="flex w-[80%] justify-around ml-[10vw] items-center mt-10 mb-5">
      <GeneralButton
        className="bg-tema navBar-button w-[16vw] text-[#d7e6bb]"
        onClick={() => handleButtonClick("categories")}
      >
        Productos
      </GeneralButton>
      <GeneralButton
        className="bg-tema navBar-button w-[16vw] text-[#d7e6bb]"
        onClick={() => handleButtonClick("offers")}
      >
        Ofertas
      </GeneralButton>
    </div>
  );
};

export default NavBar;
