"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Banner from "@/components/mainContent/Banner";
import BestSeller from "@/components/mainContent/BestSeller";
import Categories from "@/components/mainContent/categories/Categories";
import ProductDetail from "./ProductDetail/ProductDetail";
import CategoryId from "./categories/CategoryId";
import Cart from "./cart/Cart";
import UserOrders from "./user/UserOrders";
import UserInfoCard from "./user/UserInfoCard";
import ProductOffers from "./productOffers/ProductOffers";
import Favorites from "./favorites/Favorites";

const MainContent: React.FC = () => {
  const pathname = usePathname();
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem("token");
  const router = useRouter();

  const renderProduct = () => {
    if (pathname.startsWith("/products/")) {
      return (
        <div>
          <ProductDetail />
        </div>
      );
    }
    if (
      pathname.startsWith("/categories/") &&
      pathname.split("/").length === 3
    ) {
      return (
        <div>
          <CategoryId />
        </div>
      );
    }
    switch (pathname) {
      case "/":
        return (
          <div className="flex flex-row items-center m-20">
            <Banner />
            <BestSeller />
          </div>
        );
      case "/categories":
        return (
          <div>
            <Categories />
          </div>
        );
        case "/offers":
        return (
          <div>
          <ProductOffers />
          </div>
        );
      case "/cart":
        if (isLoggedIn) {
          return (
            <div>
              <Cart />
            </div>
          );
        }
        case "/favorites":
        if (isLoggedIn) {
          return (
            <div>
            <Favorites />
            </div>
          );
        }
      case "/user":
        if (isLoggedIn) {
          return (
            <div className="flex flex-col justify-center items-center text-[#d7e6bb]">
              <UserInfoCard />
              <UserOrders />
            </div>
          );
        } else {
          router.push("/");
        }
    }
  };

  return <div>{renderProduct()}</div>;
};

export default MainContent;