/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import GeneralButton from "@/components/buttons/GeneralButton";
import UserForms from "@/components/forms/UserForms";
import ReactDOM from "react-dom";
import { useRouter } from "next/navigation";
import { IUserMenuProps } from "@/types/interfaces";
import Swal from "sweetalert2";

const UserMenu: React.FC<IUserMenuProps> = ({
  userFormsRef,
  onButtonClick,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState<"login" | "register" | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleButtonClick = (action: "Iniciar Sesión" | "Regístrate") => {
    setFormType(action === "Iniciar Sesión" ? "login" : "register");
    setShowModal(true);
  };

  const handleCartClick = () => {
    router.push("/cart");
    onButtonClick();
  };

  const handleProfileClick = () => {
    router.push("user");
    onButtonClick();
  };

const handleFavsClick = () => {
  router.push("/favorites");
  onButtonClick();
};

  const handleLogout = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const cartKey = `cart_${userId}`;
      const cart = localStorage.getItem(cartKey);
      if (cart) {
        localStorage.setItem(`savedCart_${userId}`, cart);
      }
      localStorage.removeItem(cartKey);
      localStorage.removeItem("userData");
    }
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    Swal.fire({
      icon: "success",
      title: "Sesión cerrada",
      showConfirmButton: true,
    });
    onButtonClick();
    router.push("/");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div
      ref={menuRef}
      className="user-menu flex flex-col items-center space-y-0 w-100"
    >
      {!isLoggedIn ? (
        <>
          <GeneralButton
            onClick={() => handleButtonClick("Iniciar Sesión")}
            className="
            w-[15vw] 
            border-b 
            border-black 
            rounded-none 
            bg-[#D7E6BB] 
            text-[#2A3B35] 
            hover:bg-[#5e9400] 
            hover:text-[#d7e6bb]
            "
          >
            Iniciar Sesión
          </GeneralButton>

          <GeneralButton
            onClick={() => handleButtonClick("Regístrate")}
            className="
            w-[15vw] 
            border-b 
            border-black 
            rounded-none 
            bg-[#D7E6BB] 
            text-[#2A3B35] 
            hover:bg-[#5e9400] 
            hover:text-[#d7e6bb]
            "
          >
            Regístrate
          </GeneralButton>
        </>
      ) : (
        <>
          <GeneralButton
            onClick={handleProfileClick}
            className="
            w-[15vw] 
            border-b 
            border-black 
            rounded-none 
            bg-[#D7E6BB] 
            text-[#2A3B35] 
            hover:bg-[#5e9400] 
            hover:text-[#d7e6bb]
            "
          >
            Mis Compras 
          </GeneralButton>
          <GeneralButton
            onClick={handleCartClick}
            className="
            w-[15vw] 
            border-b 
            border-black 
            rounded-none 
            bg-[#D7E6BB] 
            text-[#2A3B35] 
            hover:bg-[#5e9400] 
            hover:text-[#d7e6bb]
            "
          >
            Carrito de compra
          </GeneralButton>
          <GeneralButton
            onClick={handleFavsClick}
            className="
            w-[15vw] 
            border-b 
            border-black 
            rounded-none 
            bg-[#D7E6BB] 
            text-[#2A3B35] 
            hover:bg-[#5e9400] 
            hover:text-[#d7e6bb]
            "
          >
            Favoritos
          </GeneralButton>
          <GeneralButton
            onClick={handleLogout}
            className="
            w-[15vw] 
            border-b 
            border-black 
            rounded-none 
            bg-[#D7E6BB] 
            text-[#2A3B35] 
            hover:bg-[#5e9400] 
            hover:text-[#d7e6bb]
            "
          >
            Cerrar Sesión
          </GeneralButton>
        </>
      )}

      {showModal &&
        formType &&
        ReactDOM.createPortal(
          <div ref={userFormsRef}>
            <UserForms
              formType={formType}
              onClose={() => setShowModal(false)}
            />
          </div>,
          document.body
        )}
    </div>
  );
};

export default UserMenu;
