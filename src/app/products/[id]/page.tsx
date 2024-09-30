import CategoriesBar from "@/components/mainContent/categories/CategoriesBar";
import MainContent from "@/components/mainContent/MainContent";
import React from "react";

const productDetail = () => {
  return (
    <div className="flex flex-col items-center">
      <CategoriesBar />
      <MainContent />
    </div>
  );
};
export default productDetail;
