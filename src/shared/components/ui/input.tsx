import React from 'react';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', ...props }, ref) => {
    const baseClasses = 'border-[#CFD1D5] border rounded-sm p-5 font-bold text-[#878B96]';

    return <input ref={ref} className={`${baseClasses} ${className}`} {...props} />;
  },
);

Input.displayName = 'Input';

export default Input;
