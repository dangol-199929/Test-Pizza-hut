import { emptyPages } from "@/shared/lib/image-config";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const EmptyOffer = () => {
  return (
    <div className="container">
      <div className="max-w-[520px] mx-auto text-center py-12">
        <div className="">
          <Image
            className="object-contain mx-auto w-[350px] h-auto"
            src={emptyPages?.offer}
            width={100}
            height={100}
            alt="empty-cart"
          />
        </div>
        <h1 className="mb-4 text-xl font-medium lg:mb-3">
          No Offers Available
        </h1>
        <p className="mb-4 text-md ">
          Thank you for using Pizza Hut. We will be in contact with more details
          shortly.
        </p>
        <Link
          href="/"
          className="bg-primary font-bold py-[10px] px-[22px] text-white rounded-full transition-all delay-100 duration-150 hover:bg-slate-850"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default EmptyOffer;
