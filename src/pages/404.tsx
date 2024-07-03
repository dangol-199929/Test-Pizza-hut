import CustomImage from "@/shared/components/custom-image";
import { FallBackImg, fourzerofour } from "@/shared/lib/image-config";
import MainLayout from "@/shared/main-layout";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div>
      <div className="container flex flex-col items-center py-8 text-center">
        <CustomImage
          fallback={FallBackImg}
          src={fourzerofour}
          width={634}
          height={417}
          className="my-7"
          alt="error"
        />
        <h1 className="mb-4 text-3xl font-semibold text-black ">
          Page not found
        </h1>
        {/* <p className="text-sm">
          The page you were looking for could not be found.
        </p> */}
        <p className="mb-8 text-base">
          Uh-oh! Looks like the page you are trying to access, does not exist
          <br />
          Please start afresh.
        </p>
        <Link
          href="/"
          aria-label="go-to-home"
          className="px-20 py-3 mb-8 text-white bg-primary hover:bg-red-800 rounded-lg"
        >
          {" "}
          GO TO HOMEPAGE{" "}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

NotFound.getLayout = (page: any) => {
  return <MainLayout configData={""}>{page}</MainLayout>;
};
