import { forwardRef } from "react";

import InputLabel from "./InputLabel";

/* eslint-disable react/prop-types */
const Input = forwardRef(({ label, errorMessage, ...rest }, ref) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9A9C9F]"
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
