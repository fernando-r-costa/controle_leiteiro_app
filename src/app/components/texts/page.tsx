type TextProps = {
  children: string;
};

const FormTitle: React.FC<TextProps> = ({ children }) => {
  return <h1 className="text-[2em] font-semibold my-4">{children}</h1>;
};

const FormLabelLarge: React.FC<TextProps> = ({ children }) => {
  return <label className="text-[1.4em] mb-2 text-center">{children}</label>;
};

const FormLabelShort: React.FC<TextProps> = ({ children, ...props }) => {
  return (
    <label className="text-[1.3em] sm:text-[1.4em] mb-4 text-center">
      {children}
    </label>
  );
};

const FormError: React.FC<TextProps> = ({ children }) => {
  return (
    <div className="text-[1.4em] font-semibold mb-4 text-highlight-color">
      {children}
    </div>
  );
};

export { FormTitle, FormLabelLarge, FormLabelShort, FormError };
