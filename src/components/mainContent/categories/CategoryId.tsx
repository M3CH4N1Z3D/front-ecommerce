import React from "react";
import { useParams } from "next/navigation";
import CardProduct from "@/components/CardProducts/CardProduct";
import { IProduct } from "@/types/interfaces";

const CategoryId: React.FC = () => {
  const params = useParams();
  const idParam = params.id;
  const categoryId = Array.isArray(idParam)
    ? parseInt(idParam[0], 10)
    : parseInt(idParam, 10);

  if (typeof window === 'undefined') {
    return null;
  }

  const storedProducts = localStorage.getItem("products");
  const productos: IProduct[] = storedProducts
    ? JSON.parse(storedProducts)
    : [];

  const filteredProducts = productos.filter(
    (product) => product.categoryId === categoryId
  );

  return (
    <div className="flex flex-row w-[80vw] justify-center">
      {filteredProducts.map((product) => (
        <CardProduct
          key={product.id}
          id={product.id}
          name={product.name}
          image={product.image}
        />
      ))}
    </div>
  );
};

export default CategoryId;