import { forwardRef } from "react";

import InputLabel from "./InputLabel";

/* eslint-disable react/prop-types */
// Uncontrolled Input
const Input = forwardRef(({ label, errorMessage, ...rest }, ref) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className="text-brand-dark-blue outline-brand-primary border-brand-border placeholder:text-brand-text-gray rounded-lg border border-solid px-4 py-3 placeholder:text-sm"
        ref={ref}
        {...rest}
      />
      {/* mensagem de erro */}
      {errorMessage && (
        <span className="text-left text-xs text-red-500">{errorMessage}</span>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
