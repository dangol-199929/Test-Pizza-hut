import Link from "next/link";
import React from "react";
import Image from "next/image";
import { FallBackImg, emptyPages } from "@/shared/lib/image-config";
import CustomImage from "@/shared/components/custom-image";

export interface IEmptyPage {
  type?: string | string[];
}

const EmptyPage = ({ type }: IEmptyPage) => {
  return (
    <div className="pt-0">
      <div className="container">
        <div>
          <CustomImage
            src={emptyPages?.search}
            width={64}
            height={64}
            alt={`Image`}
            fallback={FallBackImg}
          />

          <div className="text-center">
            <h2 className="text-lg font-medium capitalize">
              No {type || "Products"} Found
            </h2>
            <p>
              {" "}
              Thank you for using Pizza Hut. We will be in contact with more
              details shortly.
            </p>
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/"
              className="bg-primary font-bold py-[10px] px-[22px] text-white rounded-full transition-all delay-100 duration-150 hover:bg-slate-850"
              aria-label="continue-shopping"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyPage;
