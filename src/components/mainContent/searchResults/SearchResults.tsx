"use client";
import React, { useEffect, useState } from "react";
import CardProduct from "@/components/CardProducts/CardProduct";
import { IProduct } from "@/types/interfaces";
import { ISearchResultsProps } from "@/types/interfaces";

const SearchResults: React.FC<ISearchResultsProps> = ({ id }) => {
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedResults = localStorage.getItem("searchResults");
      if (storedResults) {
        setSearchResults(JSON.parse(storedResults));
      }
    }
  }, [id]);

  return (
    <div className="flex flex-wrap gap-4 w-[80vw] justify-center ml-[5vw] mt-[10vh]">
      {searchResults.map((product) => (
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
export default SearchResults;
