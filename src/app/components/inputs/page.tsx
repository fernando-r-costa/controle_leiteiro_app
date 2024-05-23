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
};

const FormInput = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, value, onChange, size, options }, ref) => {
    switch (size) {
      case "large":
        return (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="text-[1.4em] p-2 outline-none rounded-lg shadow-lg cursor-pointer mb-8 focus:shadow-tertiary-color hover:shadow-tertiary-color"
            ref={ref}
          />
        );
      case "short":
        return (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-24 text-[1.4em] p-2 outline-none rounded-lg shadow-lg cursor-pointer focus:shadow-tertiary-color hover:shadow-tertiary-color"
          />
        );
      case "select":
        return (
          <select
            value={value}
            onChange={onChange}
            className="text-[1.4em] p-2 outline-none rounded-lg shadow-lg cursor-pointer mb-8 focus:shadow-tertiary-color hover:shadow-tertiary-color"
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
