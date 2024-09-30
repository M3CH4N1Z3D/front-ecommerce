import React from "react";
import Image from "next/image";
import { socialNetworks } from "@/helpers/socialNetworks";

const SocialNetworkContainer: React.FC = () => {
  return (
    <div className="flex flex-row justify-center max-h-[5vh] gap-[5vw]">
      {socialNetworks.map((network) => (
        <a
          key={network.name}
          href={network.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Enlace a ${network.name}`}
        >
          <Image
            className="h-[5vh] w-auto max-h-[5vh] mt-[3vh]"
            src={network.imageUrl}
            alt={network.name}
            width={50}
            height={50}
          />
        </a>
      ))}
    </div>
  );
};

export default SocialNetworkContainer;
