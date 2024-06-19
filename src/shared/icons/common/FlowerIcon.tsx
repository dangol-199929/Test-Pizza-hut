import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<SVGSVGElement> {}

const FlowerIcon: React.FC<Props> = ({ ...rest }) => {
  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      width="1.3rem"
      height="1.3rem"
      viewBox="0 0 18 18"
    >
      <defs>
        <clipPath id="clip-path">
          <rect
            id="Rectangle_739"
            data-name="Rectangle 739"
            width="1.3rem"
            height="1.3rem"
            transform="translate(422 1930)"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          />
        </clipPath>
      </defs>
      <g
        id="Mask_Group_75"
        data-name="Mask Group 75"
        transform="translate(-422 -1930)"
        clipPath="url(#clip-path)"
      >
        <g id="hydrangea" transform="translate(423 1931)">
          <path
            id="Path_22321"
            data-name="Path 22321"
            d="M167.014,6.277V3.644a.454.454,0,0,1,.907,0V6.277a1.519,1.519,0,0,1,.261.109L169.5,5.07a2.494,2.494,0,0,0,.09-3.434L168.546.48a1.451,1.451,0,0,0-2.157,0l-1.041,1.156a2.494,2.494,0,0,0,.09,3.434l1.315,1.315a1.52,1.52,0,0,1,.261-.109Z"
            transform="translate(-159.726)"
            fill="currentColor"
          />
          <path
            id="Path_22322"
            data-name="Path 22322"
            d="M305.584,169.587l1.156-1.041a1.451,1.451,0,0,0,0-2.157l-1.156-1.041a2.494,2.494,0,0,0-3.434.09l-1.315,1.315a1.521,1.521,0,0,1,.109.261h2.633a.454.454,0,0,1,0,.907h-2.633a1.523,1.523,0,0,1-.109.261l1.315,1.315A2.494,2.494,0,0,0,305.584,169.587Z"
            transform="translate(-291.738 -159.726)"
            fill="currentColor"
          />
          <path
            id="Path_22323"
            data-name="Path 22323"
            d="M167.921,300.944v2.633a.454.454,0,0,1-.907,0v-2.633a1.521,1.521,0,0,1-.261-.109l-1.315,1.315a2.494,2.494,0,0,0-.09,3.434l1.041,1.156a1.451,1.451,0,0,0,2.157,0l1.041-1.156a2.494,2.494,0,0,0-.09-3.434l-1.315-1.315A1.521,1.521,0,0,1,167.921,300.944Z"
            transform="translate(-159.726 -291.738)"
            fill="currentColor"
          />
          <path
            id="Path_22324"
            data-name="Path 22324"
            d="M3.306,170.228A2.489,2.489,0,0,0,5.07,169.5l1.315-1.315a1.525,1.525,0,0,1-.109-.261H3.644a.454.454,0,1,1,0-.907H6.277a1.522,1.522,0,0,1,.109-.261L5.07,165.438a2.494,2.494,0,0,0-3.434-.09L.48,166.389a1.451,1.451,0,0,0,0,2.157l1.156,1.041A2.488,2.488,0,0,0,3.306,170.228Z"
            transform="translate(0 -159.726)"
            fill="currentColor"
          />
          <circle
            id="Ellipse_22"
            data-name="Ellipse 22"
            cx="0.626"
            cy="0.626"
            r="0.626"
            transform="translate(7.115 7.115)"
            fill="currentColor"
          />
        </g>
      </g>
    </svg>
  );
};

export default FlowerIcon;
