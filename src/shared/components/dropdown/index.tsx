import React from "react";
import { DropdownProps } from "./dropdown.props";
import CaretDownIcon from "@/shared/icons/common/CaretDownIcon";
import Link from "next/link";

const dropdownData = [
  { slug: "plant-consultation", title: "Plant Consultation" },
  { slug: "gift-plant", title: "Gift a plant" },
  { slug: "who-we-are", title: "Who We Are" },
  { slug: "about-us", title: "Our Story" },
  { slug: "our-values", title: "Values That Make Us Who We Are" },
  { slug: "career", title: "Working At I Am The Gardner" },
  { slug: "csr", title: "Our CSR Project" },
];


const Dropdown: React.FC<DropdownProps> = ({
  children,
  type,
  disabled = false,
  className,
  toggleClassName,
  listClassName,
  size = "md",
  icon,
  iconPosition = "left",
  outline = false,
  loading = false,
  dropdownIcon = true,
  data,
  onItemClick,
}) => {
  const handleItemClick = (index: number) => {
    if (onItemClick) {
      onItemClick(data ?? [], index);
    }
  };
  return (
    <div className={`dropdown ${className}`}>
      <label
        tabIndex={0}
        className={`btn-${size} m-1 whitespace-nowrap text-[#555] text-sm font-medium flex gap-1 justify-center items-center ${toggleClassName}`}
      >
        {iconPosition === "left" ? icon : ""}
        {children}
        {iconPosition === "right" ? icon : ""}
        {dropdownIcon ? <CaretDownIcon /> : ""}
      </label>
      <ul
        tabIndex={0}
        className={`dropdown-content menu shadow p-0 bg-base-100 rounded-sm min-w-[110px] z-[60] ${listClassName}`}
      >
        {data?.map((item, index) => {
          const dropdownItem = dropdownData.find((data) => data.title === item);
          if (dropdownItem) {
            return (
              <li key={index} onClick={() => handleItemClick(index)}>
                <Link href={`/${dropdownItem.slug}`} className="dropdown-item" aria-label={dropdownItem.title}>
                  {dropdownItem.title}
                </Link>
              </li>
            );
          } else {
            return null;
          }
        })}
      </ul>
    </div>
  );
};


export default Dropdown;
