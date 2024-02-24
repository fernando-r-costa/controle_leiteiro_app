"use client";

const IndividualForm = () => {
  return (
    <form className="flex flex-col items-center text-center mx-8">
      <h1 className="text-[2em] font-semibold my-4">
        Insira os dados do animal:
      </h1>

      <label
        htmlFor="form-input-number-id"
        className="text-[1.4em] mb-4 text-center"
      >
        Número:
      </label>
      <input
        type="number"
        className="text-[1.4em] p-2 outline-none rounded-lg shadow-lg cursor-pointer mb-8 focus:shadow-highlight-color hover:shadow-highlight-color"
      ></input>

      <label
        htmlFor="form-input-name-id"
        className="text-[1.4em] mb-4 text-center"
      >
        Nome:
      </label>
      <input
        type="text"
        className="text-[1.4em] p-2 outline-none rounded-lg shadow-lg cursor-pointer mb-8 focus:shadow-highlight-color hover:shadow-highlight-color"
      ></input>

      <label htmlFor="form-input-del" className="text-[1.4em] mb-4 text-center">
        Data Parto:
      </label>
      <input
        type="date"
        className="text-[1.4em] p-2 outline-none rounded-lg shadow-lg cursor-pointer mb-8 focus:shadow-highlight-color hover:shadow-highlight-color"
      ></input>

      <ul className="flex gap-4 flex-nowrap">
        <li className="flex flex-col items-center">
          <label
            htmlFor="form-input-milking-1"
            className="text-[1.3em] sm:text-[1.4em] mb-4 text-center"
          >
            Ordenha 1:
          </label>
          <input
            type="number"
            className="w-24 text-[1.4em] p-2 outline-none rounded-lg shadow-lg cursor-pointer focus:shadow-highlight-color hover:shadow-highlight-color"
          ></input>
        </li>
        <li className="flex flex-col items-center">
          <label
            htmlFor="form-input-milking-2"
            className="text-[1.3em] sm:text-[1.4em] mb-4 text-center"
          >
            Ordenha 2:
          </label>
          <input
            type="number"
            className="w-24 text-[1.4em] p-2 outline-none rounded-lg shadow-lg cursor-pointer focus:shadow-highlight-color hover:shadow-highlight-color"
          ></input>
        </li>
        <li className="flex flex-col items-center">
          <label
            htmlFor="form-input-milking-3"
            className="text-[1.3em] sm:text-[1.4em] mb-4 text-center"
          >
            Ordenha 3:
          </label>
          <input
            type="number"
            className="w-24 text-[1.4em] p-2 outline-none rounded-lg shadow-lg cursor-pointer focus:shadow-highlight-color hover:shadow-highlight-color"
          ></input>
        </li>
      </ul>
    </form>
  );
};

export default IndividualForm;
