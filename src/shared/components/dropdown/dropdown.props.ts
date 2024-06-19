import { ReactNode } from "react";

export type DropdownProps = {
    children?: ReactNode;
    type?:
    | 'neutral'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'error'
    | 'success'
    | 'warning'
    | 'link'
    | 'circle'
    | 'ghost';
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLElement> | undefined;
    className?: string;
    toggleClassName?: string;
    listClassName?: string;
    size?: 'lg' | 'md' | 'sm' | 'xs';
    icon?: ReactNode;
    iconPosition?: 'left'| 'right';
    outline?: boolean;
    loading?: boolean;
    dropdownIcon?: boolean;
    data?: any[];
    onItemClick?: (item: any, index: number) => void;
}