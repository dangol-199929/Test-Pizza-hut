import React from "react";
import { BadgeProps } from "./badge.props";

const Badge: React.FC<BadgeProps> = ({
  badgePosition = "top-right",
  children,
  className,
  position = "absolute",
}) => {
  const basePosition =
    {
      top: "-top-2",
      "top-right": "-top-2 -right-2",
      "top-left": "-top-2 -left-2",
      bottom: "-bottom-2",
      "bottom-left": "-bottom-2 -left-2",
      "bottom-right": "-bottom-2 -right-2",
    }[badgePosition] || "-top-2 -right-2";

  // 'top' | 'top-right' | 'top-left' | 'bottom' | 'bottom-right' | 'bottom-left' ;
  return (
    <div
      className={`badge text-white py-[2px] px-[4px] md:p-[5px]  text-[11px] sm:text-sm ${position} ${basePosition}
      ${className ? className : ""}`}
    >
      {children}
    </div>
  );
};

export default Badge;
