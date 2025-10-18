import { forwardRef } from "react";

type InputProps = {
  type: string;
  placeholder?: string;
  value: string | number;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  size: "large" | "short" | "select";
  options?: { label: string; value: string | number }[];
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLSelectElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLSelectElement>;
};

const FormInput = forwardRef<HTMLInputElement | HTMLSelectElement, InputProps>(
  ({ type, placeholder, value, onChange, size, options, onFocus, onBlur }, ref) => {
    switch (size) {
      case "large":
        return (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
            onFocus={onFocus as React.FocusEventHandler<HTMLInputElement>}
            onBlur={onBlur as React.FocusEventHandler<HTMLInputElement>}
            className="text-[1.4em] p-2 outline-none rounded-lg shadow-lg cursor-pointer mb-8 focus:shadow-tertiary-color hover:shadow-tertiary-color"
            ref={ref as React.RefObject<HTMLInputElement>}
          />
        );
      case "short":
        return (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
            onFocus={onFocus as React.FocusEventHandler<HTMLInputElement>}
            onBlur={onBlur as React.FocusEventHandler<HTMLInputElement>}
            className="w-24 text-[1.4em] p-2 outline-none rounded-lg shadow-lg cursor-pointer focus:shadow-tertiary-color hover:shadow-tertiary-color"
            ref={ref as React.RefObject<HTMLInputElement>}
          />
        );
      case "select":
        return (
          <select
            value={value}
            onChange={onChange as (e: React.ChangeEvent<HTMLSelectElement>) => void}
            onFocus={onFocus as React.FocusEventHandler<HTMLSelectElement>}
            onBlur={onBlur as React.FocusEventHandler<HTMLSelectElement>}
            className="text-[1.4em] p-2 outline-none rounded-lg shadow-lg cursor-pointer mb-8 focus:shadow-tertiary-color hover:shadow-tertiary-color"
            ref={ref as React.RefObject<HTMLSelectElement>}
          >
            {options?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
    }
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
