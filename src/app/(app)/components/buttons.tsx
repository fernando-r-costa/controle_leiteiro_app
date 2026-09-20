type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  className,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="bg-primary-color text-light-color text-[1.4em] px-4 py-2 rounded-lg shadow-lg cursor-pointer mb-8 focus:shadow-tertiary-color hover:shadow-tertiary-color disabled:cursor-not-allowed disabled:opacity-60"
    >
      {children}
    </button>
  );
};

export default Button;
