"use client";
import React, { useEffect, useState } from "react";
import Skeleton from "@/components/Skeleton";
import Link from "next/link";

async function fetchCategories() {
  const response = await fetch("http://localhost:8080/categories");
  if (!response.ok) {
    throw new Error("Error al obtener las categorías");
  }
  return response.json();
}

const CategoriesBar: React.FC = () => {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        setError("Error al obtener las categorías");
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-row gap-10 text-[#d7e6bb] bg-[#2a3b3590] w-fit h-10 items-center content-center rounded-[50px] m-5">
      {loading ? (
        <Skeleton />
      ) : (
        categories.map((category) => (
          <Link
            className="
          m-3
          hover:bg-[#d7e6bb] 
          hover:rounded-[50px] 
          hover:text-[#2a3b35]
          hover:h-full
          hover:w-full
          aling-center
          text-center
          hover:flex
          hover:justify-center
          hover:items-center
          "
            key={category.id}
            href={`/categories/${category.id}`}
          >
            {category.name}
          </Link>
        ))
      )}
    </div>
  );
};

export default CategoriesBar;
