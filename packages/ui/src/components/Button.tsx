import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const paletteByVariant: Record<ButtonVariant, string> = {
  primary: '#1e3a8a',
  secondary: '#374151',
};

export const Button: FC<ButtonProps> = (props) => {
  const { children, variant = 'primary', style, type = 'button', ...rest } = props;

  return (
    <button
      type={type}
      style={{
        border: 0,
        borderRadius: 8,
        color: '#fff',
        backgroundColor: paletteByVariant[variant],
        padding: '0.5rem 0.875rem',
        fontWeight: 600,
        cursor: 'pointer',
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
};
