"use client"
import React, { useEffect, useState } from "react";
import CardProduct from "@/components/CardProducts/CardProduct";
import CategoriesBar from "./CategoriesBar";
import { IProduct } from "@/types/interfaces";

const Categories: React.FC = () => {
  const [productos, setProductos] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/products");
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
        const products = await response.json();
        localStorage.setItem("products", JSON.stringify(products));
        setProductos(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div>
        <CategoriesBar />
      </div>
      <div className="flex flex-row flex-wrap gap-[5%] items-center ml-[8vw]">
        {productos.map((product) => (
          <CardProduct
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
