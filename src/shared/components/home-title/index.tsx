import React from "react";
import { Props } from "./title.props";

const HomeTitle: React.FC<Props> = ({
  type,
  text,
  className,
  subTitle,
  subClassName,
  mb,
  font,
  fontSize,
}) => {
  const getType = () => {
    const fontClass = font ? "font-shadows" : "";

    return (
      <div className="flex justify-between items-center w-full gap-6 mb-6">
        <div className="h-[1px] w-10 border-t border-dashed border-dark grow pb-2"></div>
        <h3
          className={
            className
              ? `${className}`
              : `text-slate-850 text-2xl capitalize font-semibold mb-[15px] ${fontClass}`
          }
        >
          {text}
        </h3>
        <div className="h-[1px] w-10 border-t border-dashed border-dark grow pb-2"></div>
      </div>
    );
  };
  return <>{getType()}</>;
};

export default HomeTitle;
