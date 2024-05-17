type InputProps = {
  type: string;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
  size: "large" | "short" | "select";
  options?: { label: string; value: string | number }[];
};

const FormInput: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  size,
  options,
}) => {
  switch (size) {
    case "large":
      return (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="text-[1.4em] p-2 outline-none rounded-lg shadow-lg cursor-pointer mb-8 focus:shadow-highlight-color hover:shadow-highlight-color"
        />
      );
    case "short":
      return (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-24 text-[1.4em] p-2 outline-none rounded-lg shadow-lg cursor-pointer focus:shadow-highlight-color hover:shadow-highlight-color"
        />
      );
    case "select":
      return (
        <select
          value={value}
          onChange={onChange}
          className="text-[1.4em] p-2 outline-none rounded-lg shadow-lg cursor-pointer mb-8 focus:shadow-highlight-color hover:shadow-highlight-color"
        >
          {options?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
  }
};

export default FormInput;
