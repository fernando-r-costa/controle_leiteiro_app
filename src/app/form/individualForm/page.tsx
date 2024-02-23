"use client";

const IndividualForm = () => {
  return (
    <form className="flex flex-col items-center">
      <h1 className="text-4xl font-semibold my-12">
        Insira os dados do animal:
      </h1>

      <label htmlFor="form-input-number-id" className="text-2xl mb-4">
        Número:
      </label>
      <input
        type="number"
        className="text-2xl p-2 outline-none rounded-lg shadow-lg cursor-pointer mb-12 focus:shadow-highlight-color hover:shadow-highlight-color"
      ></input>

      <label htmlFor="form-input-name-id" className="text-2xl mb-4">
        Nome:
      </label>
      <input type="text" className="text-2xl p-2 outline-none rounded-lg shadow-lg cursor-pointer mb-12 focus:shadow-highlight-color hover:shadow-highlight-color"></input>

      <label htmlFor="form-input-del" className="text-2xl mb-4">
        Data Parto:
      </label>
      <input type="date" className="text-2xl p-2 outline-none rounded-lg shadow-lg cursor-pointer mb-12 focus:shadow-highlight-color hover:shadow-highlight-color"></input>

      <ul className="flex gap-4 flex-nowrap">
        <li className="flex flex-col items-center">
          <label htmlFor="form-input-milking-1" className="text-2xl mb-4">
            Ordenha 1:
          </label>
          <input
            type="number"
            className="w-24 text-2xl p-2 outline-none rounded-lg shadow-lg cursor-pointer focus:shadow-highlight-color hover:shadow-highlight-color"
          ></input>
        </li>
        <li className="flex flex-col items-center">
          <label htmlFor="form-input-milking-2" className="text-2xl mb-4">
            Ordenha 2:
          </label>
          <input
            type="number"
            className="w-24 text-2xl p-2 outline-none rounded-lg shadow-lg cursor-pointer focus:shadow-highlight-color hover:shadow-highlight-color"
          ></input>
        </li>
        <li className="flex flex-col items-center">
          <label htmlFor="form-input-milking-3" className="text-2xl mb-4">
            Ordenha 3:
          </label>
          <input
            type="number"
            className="w-24 text-2xl p-2 outline-none rounded-lg shadow-lg cursor-pointer focus:shadow-highlight-color hover:shadow-highlight-color"
          ></input>
        </li>
      </ul>
    </form>
  );
};

export default IndividualForm;
