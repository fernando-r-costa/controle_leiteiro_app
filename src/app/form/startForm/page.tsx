"use client";
import { useRouter } from "next/navigation";

const StartForm = () => {
  const router = useRouter();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/form/individualForm");
  };

  return (
    <form className="flex flex-col items-center" onSubmit={handleFormSubmit}>
      <h1 className="text-4xl font-semibold my-12">Dados iniciais:</h1>

      <label htmlFor="form-input-farm" className="text-2xl mb-4">
        Qual o nome da Fazenda ou do Retiro onde será feita a medição:
      </label>
      <input
        type="text"
        id="form-input-farm"
        className="text-2xl p-2 outline-none rounded-lg shadow-lg cursor-pointer mb-12 focus:shadow-highlight-color hover:shadow-highlight-color"
      ></input>

      <label htmlFor="form-input-date" className="text-2xl mb-4">
        Informe a data da medição:
      </label>
      <input
        type="date"
        id="form-input-date"
        className="text-2xl p-2 outline-none rounded-lg shadow-lg cursor-pointer mb-12 focus:shadow-highlight-color hover:shadow-highlight-color"
      ></input>

      <label htmlFor="form-input-milking" className="text-2xl mb-4">
        Informe a quantidade de ordenhas:
      </label>
      <input
        type="number"
        id="form-input-milking"
        className="text-2xl p-2 outline-none rounded-lg shadow-lg cursor-pointer mb-12 focus:shadow-highlight-color hover:shadow-highlight-color"
      ></input>
      <button
        type="submit"
        className="bg-primary-color text-light-color text-2xl px-4 py-2 rounded-lg shadow-lg cursor-pointer mb-12 focus:shadow-highlight-color hover:shadow-highlight-color"
      >
        Iniciar
      </button>
    </form>
  );
};

export default StartForm;
