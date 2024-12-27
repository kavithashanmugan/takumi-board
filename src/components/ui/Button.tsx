import React, { ReactNode } from "react";

interface ButtonProps {
    label?: string; 
    onClick: () => void; 
    variant?: "primary" | "secondary" | "danger" | "success" | "custom"; 
    size?: "small" | "medium" | "large"; 
    icon?: ReactNode; 
    disabled?: boolean; 
    className?: string; 
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    variant = "primary",
    size = "medium",
    icon,
    disabled = false,
    className = "",
}) => {
    const variantStyles = {
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        secondary: "bg-gray-500 text-white hover:bg-gray-600",
        danger: "bg-red-500 text-white hover:bg-red-600",
        success: "bg-green-500 text-white hover:bg-green-600",
        custom: "bg-gray text-gray-800 hover:bg-gray-600",
    };

    const sizeStyles = {
        small: "px-3 py-1 text-sm",
        medium: "px-4 py-2 text-base",
        large: "px-6 py-3 text-lg",
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center justify-center gap-2 rounded-md transition duration-200 ${sizeStyles[size]} ${variantStyles[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
        >
            {icon && <span>{icon}</span>}
            {label && <span>{label}</span>}
        </button>
    );
};

export default Button;
