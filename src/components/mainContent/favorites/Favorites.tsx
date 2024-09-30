"use client";
import { IProduct } from "@/types/interfaces";
import React, { useEffect, useState } from "react";
import CardProduct from "@/components/CardProducts/CardProduct";

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<IProduct[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        return;
      }

      const favoritesKey = `favorite_${userId}`;
      const storedFavorites = localStorage.getItem(favoritesKey);
      const products = storedFavorites ? JSON.parse(storedFavorites) : [];
      setFavorites(products);
    }
  }, []);

  return (
    <div className="flex flex-row items-center justify-center">
      {favorites.length === 0 ? (
        <div>No hay favoritos</div>
      ) : (
        favorites.map((product) => (
          <CardProduct
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
          />
        ))
      )}
    </div>
  );
};

export default Favorites;
