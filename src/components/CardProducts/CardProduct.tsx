import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ICardProductProps } from "@/types/interfaces";

const CardProduct: React.FC<ICardProductProps> = ({ id, name, image }) => {
  const router = useRouter();

  const handleImageClick = () => {
    router.push(`/products/${id}`);
  };
  return (
    <div className="flex flex-col justify-center items-center card-product rounded shadow-lg p-4">
      <div>
        <Image
          src={image}
          alt={name}
          width={200}
          height={200}
          className="object-cover"
        />
      </div>
      <div>
        <h2 className="text-lg font-bold mt-2 text-[#d7e6bb]">{name}</h2>

        <p
          className="text-blue-500 mt-2 cursor-pointer hover:text-[#59CBAC] font-bold"
          onClick={handleImageClick}
        >
          Ver más
        </p>
      </div>
    </div>
  );
};

export default CardProduct;
