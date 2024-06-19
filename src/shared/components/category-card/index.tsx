import React from "react";
import { Props } from "./category-card.props";
import Link from "next/link";
import Image from "next/image";

const CategoryCard: React.FC<Props> = ({ title, shopLink, image }) => {
  return (
    <div className="relative category-card bg-[#F9F8F6] hover:bg-[#FFF4E8] !shadow-none !rounded-[20px] p-[20px] flex flex-col justify-center items-center aspect-square">
      <Link className="absolute w-full h-full z-[1]" href={shopLink} />
      <div className="flex justify-center">
        <Image
          src={image}
          className="transition-all duration-300 delay-200 rounded-full !max-h-[84px] !max-w-[84px]"
          alt="Category Image"
          width={400}
          height={400}
          quality={100}
          priority={true}
          style={{
            maxWidth: "100%",
            height: "auto",
            width: "100%",
          }}
        />
      </div>
      <div className="mt-[20px] text-center">
        <h2 className="category-card-title text-lg !font-normal">{title}</h2>
      </div>
    </div>
  );
};

export default CategoryCard;
