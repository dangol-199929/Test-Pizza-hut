import React, { ReactNode } from 'react';

export type BadgeProps = {
    type?:
        | 'neutral'
        | 'primary'
        | 'secondary'
        | 'accent'
        | 'info'
        | 'error'
        | 'success'
        | 'warning'
        | 'ghost';
    className?: string;
    badgePosition?: 'top' | 'top-right' | 'top-left' | 'bottom' | 'bottom-right' | 'bottom-left';
    children?: ReactNode;
    size?: 'lg' | 'md' | 'sm' | 'xs';
    textColor?: string;
    position?: 'relative' | 'absolute' | 'sticky' | 'fixed' | 'unset';
};
