/** @format */

import React from "react";

const Button = ({
  onClick,
  className = "",
  children,
  type = "button",
  bgColor = "bg-primary",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      {...props}
      className={`px-6 py-3 mt-auto font-medium capitalize rounded-lg ${bgColor} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
