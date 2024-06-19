import React, { FC } from "react";
interface IProps {
  title: string;
  subtitle?: string;
}
const TermsBanner: FC<IProps> = ({ title, subtitle }) => {
  return (
    <nav
      className="
      flex justify-center items-center text-center bg-[#F2F3F8] py-[66px]"
    >
      <div className="breadcrumb-content">
        <h1 className="text-[#363636] text-[36px] font-semibold leading-10">
          {title}
        </h1>
        <h4 className="text-[#363636] text-base font-normal capitalize">
          {subtitle}
        </h4>
      </div>
    </nav>
  );
};

export default TermsBanner;
