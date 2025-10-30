import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', ...props }) => {
  const baseClasses = "inline-flex items-center justify-center font-semibold py-2 px-4 rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "accent-bg text-white hover:accent-bg-hover focus:ring-indigo-500 shadow-md hover:shadow-lg",
    secondary: "bg-tertiary text-primary hover:bg-gray-300 dark:hover:bg-gray-600 focus:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-md hover:shadow-lg",
    ghost: "text-secondary hover:bg-tertiary hover:text-primary focus:ring-gray-400"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;