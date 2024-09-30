import React, { useEffect, useState } from "react";
import CardProduct from "@/components/CardProducts/CardProduct";
import { IOrder } from "@/types/interfaces";


const UserOrders: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token no encontrado. Por favor, inicia sesión.");
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/users/orders", {
          method: "GET",
          headers: {
            "content-Type": "application/json",
            Authorization: token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          alert("Error al obtener las órdenes");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Error en la solicitud");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex flex-col">
      {orders.map((order) => (
        <div className="flex flex-col items-center gap-10 bg-[#d7e6bb10] m-[2vw] p-4 rounded-2xl" key={order.id}>
          <div className="flex flex-row">
            {order.products.map((product) => (
              <CardProduct
                key={product.id}
                id={product.id}
                name={product.name}
                image={product.image}
              />
            ))}
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex flex-row gap-10">
              <h1 className="font-bold uppercase">Estado:</h1>
              <p className="uppercase">{order.status}</p>
            </div>
            <div className="flex flex-row gap-10">
              <h2 className="font-bold uppercase">Fecha:</h2>
              <p>{order.date}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
