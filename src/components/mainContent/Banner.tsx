"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IProduct } from "@/types/interfaces";
import { useRouter } from "next/navigation";

const Banner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productos, setProductos] = useState<IProduct[]>([]);
  const router = useRouter();
  const id = productos[currentIndex]?.id;

  useEffect(() => {
    if (typeof window! == "undefined") {
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        setProductos(JSON.parse(storedProducts));
      }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % productos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [productos]);

  const handleImageClick = () => {
    router.push(`/products/${id}`);
  };

  return (
    <div className="flex-col w-[46%] h-60 overflow-hidden flex items-center justify-center m-20px">
      <h1 className="font-bold text-[#d7e6bb] m-[2vw]">LOS FAVORITOS</h1>
      <div className="relative w-full h-full flex items-center justify-center">
        {productos.map((product, index) => (
          <Image
            key={index}
            src={product.image}
            alt={product.name}
            width={800}
            height={400}
            className={`absolute transition-transform duration-500 ease-in-out object-contain max-w-full max-h-full ${
              index === currentIndex
                ? "translate-x-0"
                : index < currentIndex
                ? "-translate-x-full"
                : "translate-x-full"
            }`}
            onClick={handleImageClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
