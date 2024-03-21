"use client";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/startForm");
  };

  return (
    <form
      className="flex flex-col items-center text-center mx-8"
      onSubmit={handleFormSubmit}
    >
      <h1 className="text-[2em] font-semibold my-4">Login:</h1>

      <label
        htmlFor="form-input-farm"
        className="text-[1.4em] mb-4 text-center"
      >
        E-MAIL:
      </label>
      <input
        type="text"
        id="form-input-farm"
        className="text-[1.4em] p-2 outline-none rounded-lg shadow-lg cursor-pointer mb-8 focus:shadow-highlight-color hover:shadow-highlight-color"
      ></input>

      <label
        htmlFor="form-input-milking"
        className="text-[1.4em] mb-4 text-center"
      >
        SENHA:
      </label>
      <input
        type="password"
        id="form-input-milking"
        className="text-[1.4em] p-2 outline-none rounded-lg shadow-lg cursor-pointer mb-8 focus:shadow-highlight-color hover:shadow-highlight-color"
      ></input>
      <button
        type="submit"
        className="bg-primary-color text-light-color text-[1.4em] px-4 py-2 rounded-lg shadow-lg cursor-pointer mb-8 focus:shadow-highlight-color hover:shadow-highlight-color"
      >
        ENTRAR
      </button>
    </form>
  );
};

export default Login;
