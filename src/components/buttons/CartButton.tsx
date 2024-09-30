"use client";
import React from "react";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUserContext } from "@/context/UserContext";

const CartButton: React.FC = () => {
  const router = useRouter();
  const { userData } = useUserContext();

  if (!userData) {
    return null;
  }

  const handleCartClick = () => {
    router.push("/cart");
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 bg-[#d7e6bb] p-4 rounded-full border-4 border-tema">
      <Image
        src="/iconos/carrito_de_compra.png"
        alt="cart"
        width={60}
        height={70}
        onClick={handleCartClick}
      />
    </div>
  );
};

export default CartButton;
