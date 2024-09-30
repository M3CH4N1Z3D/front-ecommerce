import React from "react";

const Skeleton: React.FC = () => {
  return (
    <div className="flex flex-row content-center items-center justify-center skeleton h-10 w-[66vw] bg-gray-300 rounded-[50px] animate-pulse">
      ...Cargando
    </div>
  );
};

export default Skeleton;
