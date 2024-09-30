"use client";
import React, { useState } from "react";
import GeneralButton from "../buttons/GeneralButton";
import Swal from "sweetalert2";
import { useUserContext } from "@/context/UserContext";

const LoginForm: React.FC = () => {
  const { setUserData } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 4;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!validateEmail(email)) {
      newErrors.email = "El correo debe ser un email válido";
    }

    if (!validatePassword(password)) {
      newErrors.password = "La contraseña debe tener al menos 4 caracteres";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:8080/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data.user, data.token);
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.user.name);
          localStorage.setItem("userId", data.user.id);
          const savedCart = localStorage.getItem(`savedCart_${data.user.id}`);
          if (savedCart) {
            localStorage.setItem(`cart_${data.user.id}`, savedCart);
            localStorage.removeItem(`savedCart_${data.user.id}`);
          }
          console.log("Login exitoso");
          Swal.fire({
            title: "Sesion Iniciada",
            icon: "success",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `,
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `,
            },
          });
        } else {
          console.error("Error en el login");
          Swal.fire({
            title: "Verifica el correo y la contraseña",
            text: "Intentalo de nuevo",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
  };

  const handleClear = () => {
    setEmail("");
    setPassword("");
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-start">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo electrónico"
        className="mb-2 p-2 border"
      />
      {errors.email && <p className="text-red-500">{errors.email}</p>}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        className="mb-2 p-2 border"
      />
      {errors.password && <p className="text-red-500">{errors.password}</p>}
      <GeneralButton
        type="submit"
        onClick={() => {}}
        className="bg-blue-500 text-white p-2 mt-2 hover:bg-[#5e9400]"
      >
        Iniciar Sesión
      </GeneralButton>
      <GeneralButton
        type="button"
        onClick={handleClear}
        className="bg-gray-500 text-white p-2 mt-2 hover:bg-red-600"
      >
        Limpiar
      </GeneralButton>
    </form>
  );
};

export default LoginForm;
