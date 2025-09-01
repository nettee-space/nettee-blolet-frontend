import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'default' | 'full';
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'default', children, ...props }, ref) => {
    const baseClasses = 'h-12 rounded-lg font-bold text-sm tracking-[-0.03em] transition-colors';

    const variantClasses = {
      primary: 'bg-[#6B66F4] text-white hover:bg-[#5B56E4]',
      secondary: 'border bg-white text-[#6B66F4] ',
      ghost: 'text-[#6C6F78] hover:text-[#0E0E0F]',
    };

    const sizeClasses = {
      default: '',
      full: 'w-full',
    };

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
