"use client";
import React, { useState } from "react";
import GeneralButton from "../buttons/GeneralButton";
import { IFormErrors } from "@/types/interfaces";
import Swal from "sweetalert2";

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState<IFormErrors>({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
  });

  const [isVisible, setIsVisible] = useState(true);

  const validateForm = () => {
    const newErrors: IFormErrors = {};

    if (!formData.name) {
      newErrors.name = "El nombre es obligatorio";
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.com$/.test(formData.email)) {
      newErrors.email = "La direccion de correo no es valida";
    }

    if (!formData.address) {
      newErrors.address = "La dirección es obligatoria";
    }

    if (
      !formData.phone ||
      formData.phone.length < 10 ||
      /\s/.test(formData.phone)
    ) {
      newErrors.phone =
        "El teléfono debe tener al menos 10 caracteres y no debe contener espacios";
    }

    if (
      !formData.password ||
      formData.password.length < 4 ||
      !/[A-Z]/.test(formData.password) ||
      !/\d/.test(formData.password)
    ) {
      newErrors.password =
        "La contraseña debe tener al menos 4 caracteres y al menos una mayúscula y un número. No puede tener espacios";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:8080/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.status === 201) {
          setIsVisible(false);
          Swal.fire({
            title: "Usuario creado con éxito, por favor inicie sesión",
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
          Swal.fire({
            title: "El usario ya existe.",
            text: "Intentalo con otro correo",
            icon: "error",
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
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
  };

  const handleClear = () => {
    setFormData({
      name: "",
      email: "",
      address: "",
      phone: "",
      password: "",
    });
    setErrors({
      name: "",
      email: "",
      address: "",
      phone: "",
      password: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return isVisible ? (
    <form onSubmit={handleSubmit} className="flex flex-col justify-start">
      <div className="flex flex-row gap-[3vw] text-[#d7e6bb] m-[1vw]">
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Fredy Rigueros"
          required
        />
      </div>
      <div className="flex flex-row gap-[4.3vw] text-[#d7e6bb] m-[1vw]">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="usuario@gmail.com"
          required
        />
      </div>
      <div className="flex flex-row gap-[2.2vw] text-[#d7e6bb] m-[1vw]">
        <label htmlFor="address">Dirección:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Calle 123 # 456 789"
          required
        />
      </div>
      <div className="flex flex-row gap-[2.8vw] text-[#d7e6bb] m-[1vw]">
        <label htmlFor="phone">Teléfono:</label>
        <input
          type="number"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="31234567890"
          required
        />
      </div>
      <div className="flex flex-row gap-[1em] text-[#d7e6bb] m-[1vw]">
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="mínimo 4 caracteres, una mayúscula, un número, un carácter especial"
          required
        />
      </div>
      <div className="flex flex-row justify-center gap-[4%] m-[5%]">
        <GeneralButton
          type="submit"
          onClick={() => {}}
          className="bg-[#5e9400] text-[#d7e6bb] rounded-md font-bold check-button hover:bg-[#d7e6bb] hover:text-[#2a3b35]"
        >
          Registrarse
        </GeneralButton>
        <GeneralButton
          type="button"
          onClick={handleClear}
          className="bg-[#5ED6B4] text-[#2a3b35] rounded-md font-bold hover:bg-[#d7e6bb] hover:text-[#2a3b35]"
        >
          Limpiar
        </GeneralButton>
      </div>
      {errors.name && (
        <p className="text-red-500 bg-[#2a3b3580] max-w-[20vw]">
          {errors.name}
        </p>
      )}
      {errors.email && (
        <p className="text-red-500 bg-[#2a3b3580] max-w-[20vw]">
          {errors.email}
        </p>
      )}
      {errors.address && (
        <p className="text-red-500 bg-[#2a3b3580] max-w-[20vw]">
          {errors.address}
        </p>
      )}
      {errors.phone && (
        <p className="text-red-500 bg-[#2a3b3580] max-w-[20vw]">
          {errors.phone}
        </p>
      )}
      {errors.password && (
        <p className="text-red-500 bg-[#2a3b3580] max-w-[20vw]">
          {errors.password}
        </p>
      )}
    </form>
  ) : null;
};

export default RegisterForm;
