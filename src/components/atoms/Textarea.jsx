import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Textarea = forwardRef(({ 
  label,
  error,
  className = "", 
  rows = 4,
  required = false,
  ...props 
}, ref) => {
  const textareaId = props.id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        className={cn(
          "form-input resize-vertical",
          error && "error",
          className
        )}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        {...props}
      />
      {error && (
        <p 
          id={`${textareaId}-error`}
          className="mt-2 text-sm text-error"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = "Textarea";

export default Textarea;