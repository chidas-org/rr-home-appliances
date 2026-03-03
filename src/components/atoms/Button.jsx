import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = forwardRef(({ 
  children, 
  className = "", 
  variant = "primary", 
  size = "md", 
  loading = false, 
  disabled = false,
  icon,
  iconPosition = "left",
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-button focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 transition-all duration-normal disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90 focus:ring-primary/20",
    secondary: "bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary/20",
    outline: "border-2 border-secondary text-secondary hover:bg-secondary hover:text-white focus:ring-secondary/20",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-200",
    link: "text-primary hover:text-primary/80 underline-offset-4 hover:underline focus:ring-primary/20"
  };
  
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  
  const isDisabled = disabled || loading;
  
  return (
    <button
      ref={ref}
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
          Loading...
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <ApperIcon name={icon} className="w-4 h-4 mr-2" />
          )}
          {children}
          {icon && iconPosition === "right" && (
            <ApperIcon name={icon} className="w-4 h-4 ml-2" />
          )}
        </>
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;