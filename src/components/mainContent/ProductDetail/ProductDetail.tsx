import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import GeneralButton from "../../buttons/GeneralButton";
import { IProduct } from "@/types/interfaces";
import Swal from "sweetalert2";

const ProductDetail: React.FC = () => {
  const params = useParams();
  const idParam = params.id;
  const router = useRouter();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [cartItems, setCartItems] = useState<IProduct[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<IProduct[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = Array.isArray(idParam) ? idParam[0] : idParam;
      const storedproducts = localStorage.getItem("products");
      const productos: IProduct[] = storedproducts
        ? JSON.parse(storedproducts)
        : [];
      const foundProduct =
        productos.find((product) => product.id === parseInt(id || "", 10)) ||
        null;
      setProduct(foundProduct);

      const userId = localStorage.getItem("userId");
      const cartKey = `cart_${userId}`;
      const favoriteKey = `favorite_${userId}`;
      const favorite = localStorage.getItem(favoriteKey);
      const cart = localStorage.getItem(cartKey);
      setFavoriteItems(favorite ? JSON.parse(favorite) : []);
      setCartItems(cart ? JSON.parse(cart) : []);
      setIsLoggedIn(!!localStorage.getItem("token"));
    }
  }, [idParam]);

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  const productExists = cartItems.find((item) => item.id === product.id);
  const isFavorite = favoriteItems.find(
    (item: { id: number }) => item.id === product.id
  );

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      Swal.fire("Usuario no autenticado", "Por favor, inicia sesión", "error");
      return;
    }
    const updatedCart = [...cartItems, product!];
    setCartItems(updatedCart);
    const userId = localStorage.getItem("userId");
    const cartKey = `cart_${userId}`;
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    Swal.fire("Éxito", "Producto agregado al carrito", "success");
  };

  const handleAddFavorite = () => {
    if (!isLoggedIn) {
      Swal.fire(
        "Error",
        "Debes iniciar sesión para agregar a favoritos",
        "error"
      );
      return;
    }
    const updatedFavorites = [...favoriteItems, product!];
    setFavoriteItems(updatedFavorites);
    const userId = localStorage.getItem("userId");
    const favoriteKey = `favorite_${userId}`;
    localStorage.setItem(favoriteKey, JSON.stringify(updatedFavorites));
    Swal.fire("Éxito", "Producto agregado a favoritos", "success");
  };

  const handleBuyNow = async () => {
    const userId = localStorage.getItem("userId");
    const cartKey = `cart_${userId}`;
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("Token no encontrado", "Por favor, inicia sesión", "error");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ products: [product.id] }),
      });

      if (response.ok) {
        const updateCartItems = cartItems.filter(
          (item) => item.id !== product.id
        );
        localStorage.setItem(cartKey, JSON.stringify(updateCartItems));
        Swal.fire(
          "Tu compra se realizo con exito",
          "Puedes seguir comprando",
          "success"
        );
        router.push("/categories");
      } else {
        Swal.fire(
          "No se pudo realizar la compra",
          "Intentalo de nuevo",
          "error"
        );
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error en la solicitud");
    }
  };

  const handleRemoveCart = () => {
    const userId = localStorage.getItem("userId");
    const cartKey = `cart_${userId}`;
    const updateCartItems = cartItems.filter((item) => item.id !== product.id);
    localStorage.setItem(cartKey, JSON.stringify(updateCartItems));
    Swal.fire(
      "Producto eliminado del carrito",
      "Puedes seguir comprando",
      "success"
    );
    router.push("/categories");
  };

  const handleRemoveFavorite = () => {
    const userId = localStorage.getItem("userId");
    const favoriteKey = `favorite_${userId}`;
    const updateFavoriteItems = favoriteItems.filter(
      (item) => item.id !== product.id
    );
    localStorage.setItem(favoriteKey, JSON.stringify(updateFavoriteItems));
    Swal.fire(
      "Producto eliminado de favoritos",
      "Puedes seguir comprando",
      "success"
    );
    router.push("/categories");
  };

  return (
    <div className="flex flex-row w-[60vw] h-auto text-[#d7e6bb]">
      <div className="flex flex-col justify-center items-center m-[1rem]">
        <h1 className="font-bold text-3xl"> {product.name} </h1>
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={600}
          className="max-w-[20vw]"
        />
      </div>
      <div className="flex flex-col justify-center w-[40%] m-[1em]">
        <h1 className="font-bold text-2xl m-0.5">Precio:</h1>
        <p className="flex m-0.5">${product.price}</p>
        <h1 className="font-bold text-2xl m-0.5">Descripcion:</h1>
        <p className="flex m-0.5 text-justify">{product.description}</p>
        <h1 className="font-bold text-2xl m-0.5">Stock:</h1>
        <p>{product.stock}</p>
      </div>

      {isLoggedIn && (
        <div className="flex flex-col justify-center">
          {productExists ? (
            <div>
              <GeneralButton
                className="m-[1vw] bg-[#5e9400] font-bold hover:bg-[#d7e6bb] hover:text-[#2a3b35]"
                onClick={handleBuyNow}
              >
                Comprar ahora
              </GeneralButton>
              <GeneralButton
                className="m-[1vw] bg-[#5e9400] hover:bg-red-700"
                onClick={handleRemoveCart}
              >
                Ya no lo quiero
              </GeneralButton>
            </div>
          ) : (
            <div>
              <GeneralButton
                className="m-[1vw] bg-[#5e9400] font-bold hover:bg-[#d7e6bb] hover:text-[#2a3b35]"
                onClick={handleAddToCart}
              >
                Añadir al Carrito
              </GeneralButton>
            </div>
          )}
          {isFavorite ? (
            <div>
              <GeneralButton
                className="m-[1vw] bg-[#5e9400] font-bold hover:bg-red-700 hover:text-[#2a3b35]"
                onClick={handleRemoveFavorite}
              >
                Eliminar de favoritos
              </GeneralButton>
            </div>
          ) : (
            <div>
              <GeneralButton
                className="m-[1vw] bg-[#5e9400] font-bold hover:bg-[#d7e6bb] hover:text-[#2a3b35]"
                onClick={handleAddFavorite}
              >
                Añadir a Favoritos
              </GeneralButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
