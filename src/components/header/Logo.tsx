"use client"
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const Logo: React.FC = () => {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <div
      className="flex w-fit h-auto max-w-fit curso-pointer"
      onClick={handleLogoClick}
    >
      <Image
        src="/logo1.png"
        alt={"Mistery Tech"}
        className="h-auto max-h-[357px] max-w-[200px] w-[20vw] m-[1.5vw] ml-[1.5vw] logoImage"
        width={890}
        height={357}
      />
    </div>
  );
};

export default Logo;
