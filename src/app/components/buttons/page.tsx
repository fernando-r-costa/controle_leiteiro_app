type ButtonProps = {
  children: string;
  // onClick: () => void
  type?: "button" | "submit" | "reset";
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  className,
}) => {
  return (
    <button
      type={type}
      // onClick={onClick}
      className="bg-primary-color text-light-color text-[1.4em] px-4 py-2 rounded-lg shadow-lg cursor-pointer mb-8 focus:shadow-highlight-color hover:shadow-highlight-color"
    >
      {children}
    </button>
  );
};

export { Button };
