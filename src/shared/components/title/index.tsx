import React from "react";
import { Props } from "./title.props";

const Title: React.FC<Props> = ({
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

    if (type === "title-content")
      return (
        <h2
          className={
            className
              ? `${className}`
              : `py-[30px] text-slate-850 text-3xl font-medium text-center relative w-full ${fontClass} text-[${fontSize}]`
          }
        >
          {text}
        </h2>
      );
    if (type === "title-section")
      return (
        <div>
          <h3
            className={
              className
                ? `${className}`
                : `text-slate-850 text-2xl capitalize font-semibold mb-[15px] ${fontClass}`
            }
          >
            {text}
          </h3>
          {subTitle && (
            <p
              className={
                subClassName
                  ? `${subClassName}`
                  : `text-gray-450 text-sm font-normal leading-[18px] mt-[10px] ${fontClass}`
              }
            >
              {subTitle}
            </p>
          )}
        </div>
      );
    return (
      <h2
        className={
          className
            ? `${className}`
            : `text-slate-955 text-2xl text-center relative ${fontClass}`
        }
      >
        {text}
      </h2>
    );
  };
  return (
    <div
      className={`flex justify-between items-center ${
        type == "title-section" && !mb ? "mb-[30px]" : ""
      }`}
    >
      {getType()}
    </div>
  );
};

export default Title;
