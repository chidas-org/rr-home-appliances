import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Select = forwardRef(({ 
  label,
  error,
  options = [],
  placeholder = "Select an option",
  className = "", 
  required = false,
  ...props 
}, ref) => {
  const selectId = props.id || `select-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={cn(
            "form-input appearance-none pr-10 cursor-pointer",
            error && "error",
            className
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${selectId}-error` : undefined}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ApperIcon name="ChevronDown" className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      {error && (
        <p 
          id={`${selectId}-error`}
          className="mt-2 text-sm text-error"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
});

Select.displayName = "Select";

export default Select;