import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-gray-800 text-white py-4 text-center w-[90vw] m-[5%]">
      <p>
        &copy; {new Date().getFullYear()} Fredy Rigueros. Todos los derechos
        reservados.
      </p>
    </footer>
  );
};

export default Footer;
