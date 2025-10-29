// components/auth/PasswordInput.tsx

"use client";

import React, { useState } from 'react';
import InputText from "@/components/checkout/cart/input"; 
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; 

// --- PERBAIKAN DI SINI ---
// Gunakan Omit untuk menghapus properti 'size' dari React.InputHTMLAttributes
interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label: string;
    labelPlacement?: 'outside' | 'inside';
    placeholder?: string;
    name: string;
    size?: 'sm' | 'md' | 'lg'; // Sekarang tipe string ini kompatibel
    className?: string;
    register?: any; 
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, labelPlacement, placeholder, name, size = 'lg', className, register, ...rest }) => {
    const [isVisible, setIsVisible] = useState(false);
    
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className="relative w-full"> 
            <InputText
                {...register}
                {...rest}
                label={label}
                labelPlacement={labelPlacement}
                name={name}
                placeholder={placeholder}
                size={size}
                typeName={isVisible ? "text" : "password"} 
                className={className ? `${className} pr-12` : "pr-12"} 
            />
            
            <button
                type="button" 
                onClick={toggleVisibility}
                className="absolute right-0 top-1/2 -translate-y-1/2 pr-4 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 z-20"
                aria-label={isVisible ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
            >
                {isVisible ? (
                    <EyeSlashIcon className="h-5 w-5" />
                ) : (
                    <EyeIcon className="h-5 w-5" />
                )}
            </button>
        </div>
    );
};

export default PasswordInput;