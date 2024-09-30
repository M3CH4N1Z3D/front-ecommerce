"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import GeneralButton from "../buttons/GeneralButton";
import { IProduct } from "@/types/interfaces";
import { useRouter } from "next/navigation";

const BestSeller: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const router = useRouter();
  const id = filteredProducts[currentIndex]?.id;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        const products: IProduct[] = JSON.parse(storedProducts);
        const productsWithLowStock = products.filter(
          (product) => product.stock < 6
        );
        setFilteredProducts(productsWithLowStock);
      }
    }
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredProducts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex =
        (prevIndex - 1 + filteredProducts.length) % filteredProducts.length;
      return newIndex;
    });
  };
  const handleImageClick = () => {
    router.push(`/products/${id}`);
  };

  return (
    <div className="flex-col relative w-[46%] h-64 overflow-hidden flex items-center justify-center">
      <div className="font-bold text-[#d7e6bb] m-[2vw]">LOS MÁS VENDIDOS</div>
      <GeneralButton
        onClick={handlePrev}
        className="absolute left-20 text-[#d7e6bb] bg-transparent border-none text-2xl transform -translate-y-1/2 top-1/2 cursor-pointer focus:outline-none z-10"
      >
        {"<"}
      </GeneralButton>
      <div className="relative w-full h-full flex items-center justify-center">
        {filteredProducts.map((product, index) => (
          <Image
            key={index}
            src={product.image}
            alt={product.name}
            width={800}
            height={400}
            className={`absolute transition-transform duration-1000 ease-in-out object-contain max-w-full max-h-full ${
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
      <GeneralButton
        onClick={handleNext}
        className="absolute right-20 text-[#d7e6bb] bg-transparent border-none text-2xl transform -translate-y-1/2 top-1/2 cursor-pointer focus:outline-none z-10"
      >
        {">"}
      </GeneralButton>
    </div>
  );
};

export default BestSeller;