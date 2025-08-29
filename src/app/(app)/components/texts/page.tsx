type TextProps = {
  children: string;
  type: "title" | "label-large" | "label-short" | "error";
};

const FormText: React.FC<TextProps> = ({ children, type }) => {
  switch (type) {
    case "title":
      return <h1 className="text-[2em] font-semibold my-4">{children}</h1>;
    case "label-large":
      return (
        <label className="text-[1.4em] mb-2 text-center">{children}</label>
      );
    case "label-short":
      return (
        <label className="text-[1.3em] sm:text-[1.4em] mb-4 text-center">
          {children}
        </label>
      );
    case "error":
      return (
        <div className="text-[1.4em] font-semibold mb-4 text-highlight-color">
          {children}
        </div>
      );
  }
};

export default FormText;
