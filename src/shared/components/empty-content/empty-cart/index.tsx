import { CartEmpty, emptyPages } from "@/shared/lib/image-config";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import CustomImage from "../../custom-image";
import { FallBackImg } from "@/shared/lib/image-config";

const EmptyCart = () => {
  return (
    <div className="container">
      <div className="max-w-[520px] mx-auto text-center py-12">
        <div className="">
          <CustomImage
            fallback={FallBackImg}
            className="object-contain w-64 mx-auto md:w-80"
            src={emptyPages?.cart}
            width={350}
            height={350}
            alt="empty-cart"
          />
        </div>
        <h1 className="mb-4 text-xl font-medium md:text-2xl xl:text-3xl lg:mb-6">
          No Products in the cart.
        </h1>
        <p className="mb-4 text-md lg:text-lg">
          Thank you for using Pizza Hut. It looks like you haven&apos;t added
          any item.
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

export default EmptyCart;
