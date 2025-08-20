import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

export const typographyVariants = cva('text-foreground', {
  variants: {
    variant: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
      '7xl': 'text-7xl',
      '8xl': 'text-8xl',
      '9xl': 'text-9xl',
      body1: 'text-base',
      body2: 'text-sm',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      black: 'font-black',
    },
    textColor: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      accent: 'text-accent-foreground',
      card: 'text-card-foreground',
      popover: 'text-popover-foreground',
      sidebar: 'text-sidebar-foreground',
      destructive: 'text-destructive',
      white: 'text-background',
    },
  },
  defaultVariants: {
    variant: 'body1',
    weight: 'normal',
    textColor: 'default',
  },
});

interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  children?: React.ReactNode;
  as?:
    | 'p'
    | 'span'
    | 'blockquote'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'div';
  asChild?: boolean;
}

const TypographyComponent = ({
  variant,
  weight,
  textColor,
  children,
  className,
  as = 'p',
  asChild = false,
  ...rest
}: TextProps) => {
  const Tag = as;

  return (
    <Tag
      className={cn(
        asChild
          ? className
          : cn(typographyVariants({ variant, weight, textColor }), className),
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

const Typography = React.memo(TypographyComponent);

export default Typography;
