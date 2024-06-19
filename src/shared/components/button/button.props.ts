import React, { ReactNode } from 'react';


export type ButtonProps = {
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

  children?: ReactNode;
  htmlType?: 'button' | 'reset' | 'submit';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  className?: string;
  size?: 'lg' | 'md' | 'sm' | 'xs';
  icon?: ReactNode;
  iconPosition?: 'left'| 'right';
  outline?: boolean;
  loading?: boolean;
};
