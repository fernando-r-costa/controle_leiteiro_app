type InputProps = {
  type: string;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size: "large" | "short";
};

const FormInput: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  size,
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
  }
};

export default FormInput;
