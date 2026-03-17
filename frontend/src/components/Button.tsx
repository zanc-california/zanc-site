import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: disabled 
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
      : 'bg-zambia-green text-white hover:bg-zambia-green-light focus:ring-zambia-green border-2 border-transparent',
    secondary: disabled 
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
      : 'bg-zambia-green text-white hover:bg-zambia-green-light focus:ring-zambia-green border-2 border-transparent',
    outline: disabled 
      ? 'border-2 border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed' 
      : 'border-2 border-mist text-slate bg-white hover:bg-cloud focus:ring-bay-blue',
    accent: disabled
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : 'bg-copper text-white hover:bg-copper-light focus:ring-copper border-2 border-transparent',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;