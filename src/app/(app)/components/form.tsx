type FormProps = {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  animatePulse?: boolean;
};

const Form: React.FC<FormProps> = ({ onSubmit, children, animatePulse }) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col items-center text-center mx-8 ${animatePulse ? 'animate-pulse' : ''}`}
    >
      {children}
    </form>
  );
};

export default Form;
