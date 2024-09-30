"use client";
import React, { useEffect, useState } from "react";
import CardProduct from "@/components/CardProducts/CardProduct";
import GeneralButton from "@/components/buttons/GeneralButton";
import { useRouter } from "next/navigation";
import { IProduct } from "@/types/interfaces";
import Swal from "sweetalert2";

const Cart: React.FC = () => {
  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        return;
      }

      const cartKey = `cart_${userId}`;
      const storedCart = localStorage.getItem(cartKey);
      const products: IProduct[] = storedCart ? JSON.parse(storedCart) : [];
      setCartProducts(products);
    }
  }, []);

  const handleBuyAll = async () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const productIds = cartProducts.map((product) => product.id);

      if (!token) {
        Swal.fire({
          title: "Error",
          text: "Token no encontrado. Por favor, inicia sesión.",
          icon: "error",
          confirmButtonText: "Ok",
        });
        return;
      }
      try {
        const response = await fetch("http://localhost:8080/orders", {
          method: "POST",
          headers: {
            "content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ products: productIds }),
        });

        if (response.ok) {
          localStorage.removeItem(`cart_${userId}`);
          Swal.fire({
            title: "Compra realizada",
            text: "Tu compra se realizo con exito",
            icon: "success",
            confirmButtonText: "Ok",
          });
          router.push("/categories");
        } else {
          // alert("No se pudo realizar la compra, intentalo de nuevo");
          Swal.fire({
            title: "Error",
            text: "No se pudo realizar la compra, intentalo de nuevo",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        Swal.fire({
          title: "Error",
          text: "Error en la solicitud",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    }
  };

  const handleClearCart = () => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userId");
      const cartKey = `cart_${userId}`;
      localStorage.removeItem(cartKey);
      setCartProducts([]);
    }
  };

  const totalCompra = cartProducts.reduce(
    (total, product) => total + product.price,
    0
  );

  return (
    <div className="flex flex-col justify-center content-center">
      {cartProducts.length === 0 ? (
        <div className="flex flex-row justify-center items-center">
          <h1 className="flex mt-[5vw] text-[#d7e6bb] bg-[#2a3b35] p-[1vw]">
            Tu carrito está vacío, vuelve para seguir comprando
          </h1>
        </div>
      ) : (
        <div className="flex flex-col justify-center">
          <div className="flex flex-row items-center justify-center content-center">
            {cartProducts.map((product) => (
              <CardProduct
                key={product.id}
                id={product.id}
                name={product.name}
                image={product.image}
              />
            ))}
          </div>
          <div className="flex flex-row justify-center items-center gap-10 m-[1vw] text-[#d7e6bb] font-bold">
            <GeneralButton
              className="bg-[#5e9400] hover:bg-[#d7e6bb]  hover:text-[#2a3b35]"
              onClick={handleBuyAll}
            >
              Comprar Todo
            </GeneralButton>
            <GeneralButton
              className="m-[1vw] bg-[#5e9400] hover:bg-red-700"
              onClick={handleClearCart}
            >
              Vaciar Carrito
            </GeneralButton>
            <div className="flex flex-row">
              <h1 className="m-[2vw]">Total Compra:</h1>
              <p className="m-[2vw] text-[#59CBAC]">
                ${totalCompra.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
