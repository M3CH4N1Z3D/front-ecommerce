"use client";
import React, { useState } from "react";
import GeneralButton from "../buttons/GeneralButton";
import { useRouter } from "next/navigation";
import { IProduct } from "@/types/interfaces";
import { ISearchBarProps } from "@/types/interfaces";
import Swal from "sweetalert2";

const SearchBar: React.FC<ISearchBarProps> = ({
  placeholder = "Buscar...",
}) => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    localStorage.removeItem("searchResults");
    const storedProducts = localStorage.getItem("products");
    const products = storedProducts ? JSON.parse(storedProducts) : [];
    const searchResults = products.filter((product: IProduct) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    if (searchResults.length > 0) {
      localStorage.setItem("searchResults", JSON.stringify(searchResults));
      router.push(`/search/${query.toLowerCase()}`);
      setQuery("");
    } else {
      Swal.fire({
        title: "No pudimos encontrar tu producto",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="flex flex-row w-[22vw] justify-center ml-[3vw]">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full h-auto"
      />
      <GeneralButton
        onClick={handleSearch}
        className="bg-tema text-[#d7e6bb] hover:bg-[#d7e6bb] hover:text-[#2a3b35] w-full max-w-[100px] items-center justify-center text-base sm:text-lg md:text-xl"
      >
        Buscar
      </GeneralButton>
    </div>
  );
};

export default SearchBar;
