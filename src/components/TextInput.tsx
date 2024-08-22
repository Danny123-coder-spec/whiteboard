
import React, { ForwardedRef, useState } from "react";
import { FieldError } from "react-hook-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import './TextInput.css'
import { cn } from "../lib/utils";

interface TextInputProps {
  onChange: any;
  type: string;
  register: any;
  name: string;
  error?: FieldError | undefined;
  placeholder?: string;
  icon?: React.ReactNode;
}

const TextInput = React.forwardRef(
  (
    {
      type,
      register,
      name,
      error,
      placeholder,
      onChange,
      icon,
    }: TextInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [focus, setFocus] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="w-full flex flex-col my-2">
        <div className="relative flex items-center">
          <input
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChange={onChange}
            type={type === "password" ? (showPassword ? "text" : "password") : type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            className={cn(

              `placeholderText ${focus && 'border border-blue-500' } flex min-h-[44px] w-full ${
                error ? "border-[1.4px] border-[#E84545]" : "border-[1.4px] border-slate-200"
              } rounded-[8px] bg-transparent  px-3 py-2.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus:border-blue-500 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed focus:bg-transparent disabled:opacity-50 ${
                icon ? "pl-10" : ""
              }`
            )}
            {...(register ? register : {})}
            aria-invalid={error ? "true" : "false"}
          />
          {type === "password" && (
            <span
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
            </span>
          )}
          {icon && (
            <span className="absolute left-3 inset-y-0 flex items-center">
              {icon}
            </span>
          )}
        </div>
        {error && (
          <span className="text-xs text-[#f64949fe] mt-1 ">
            {error.message}
          </span>
        )}
      </div>
    );
  }
);

export default TextInput;