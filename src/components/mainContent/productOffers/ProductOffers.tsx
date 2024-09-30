import React, { useEffect, useState } from "react";
import CardProduct from "@/components/CardProducts/CardProduct";
import { IProduct } from "@/types/interfaces";

const ProductOffers: React.FC = () => {
  const [affordableProducts, setAffordableProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      const products: IProduct[] = JSON.parse(storedProducts);
      const filteredProducts = products.filter(product => product.price < 500);
      setAffordableProducts(filteredProducts);
    }
  }, []);

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {affordableProducts.map(product => (
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

export default ProductOffers;