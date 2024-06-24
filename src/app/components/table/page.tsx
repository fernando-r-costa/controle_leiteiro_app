import FormText from "../texts/page";

type TableColumn = {
  key: string;
  label: string;
};

type TableRowData = {
  cowNumber?: string | number;
  cowName?: string;
  dim: number;
  dtc?: number;
  weightMilking1: number;
  weightMilking2?: number;
  weightMilking3?: number;
  production?: string;
};

type TableProps = {
  data: TableRowData[];
  title: {
    farm: string;
    date: string;
  };
};

const Table: React.FC<TableProps> = ({ data, title: { farm, date } }) => {
  const columns: TableColumn[] = [
    { key: "cowNumber", label: "NÚMERO" },
    { key: "cowName", label: "NOME" },
    { key: "dim", label: "DIAS EM LACTAÇÃO" },
    { key: "dtc", label: "DIAS PARA PARTO" },
    { key: "production", label: "PRODUÇÃO TOTAL" },
  ];

  const sumProduction = (row: TableRowData): string => {
    const totalProduction =
      (row.weightMilking1 || 0) +
      (row.weightMilking2 || 0) +
      (row.weightMilking3 || 0);
    return totalProduction.toLocaleString("pt-BR", {
      minimumFractionDigits: 1,
    });
  };

  const sortedData = [...data]
    .map((row) => ({
      ...row,
      production: sumProduction(row),
    }))
    .sort(
      (a, b) =>
        parseFloat(b.production.replace(",", ".")) -
        parseFloat(a.production.replace(",", "."))
    );

  const formatNumber = (value: string | number) => {
    if (typeof value === "number") {
      if (Number.isInteger(value)) {
        return value.toLocaleString("pt-BR");
      } else {
        return value.toLocaleString("pt-BR", { minimumFractionDigits: 1 });
      }
    }
    return value;
  };

  const totalProduction = data.reduce(
    (sum, cow) =>
      sum +
      (cow.weightMilking1 || 0) +
      (cow.weightMilking2 || 0) +
      (cow.weightMilking3 || 0),
    0
  );

  const numberOfCows = data.length;
  const averageProduction = totalProduction / numberOfCows;
  const totalDEL = data.reduce(
    (sum, cow) => sum + (typeof cow.dim === "number" ? cow.dim : 0),
    0
  );
  const averageDEL = totalDEL / numberOfCows;

  const summaryData = [
    { label: "Total produzido", value: totalProduction.toFixed(1) },
    { label: "Vacas em produção", value: numberOfCows },
    { label: "Média de produção", value: averageProduction.toFixed(1) },
    { label: "Média DEL", value: averageDEL.toFixed(0) },
  ];

  return (
    <>
      {(farm || date) && (
        <div className="px-8">
          <FormText type={"title"}>{farm}</FormText>
          <FormText
            type={"label-large"}
          >{`Data do Controle: ${date}`}</FormText>
        </div>
      )}
      <div className="overflow-x-auto mt-4 p-2">
        <table className="w-full border-collapse border border-primary-color">
          <thead>
            <tr className="bg-primary-color text-light-color">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-2 sticky top-0 bg-primary-color z-10"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-light-color" : ""}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="border border-primary-color px-4 py-2 text-center"
                  >
                    {formatNumber(row[column.key as keyof TableRowData] || "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 px-8">
        <div className="overflow-x-auto mb-4 p-2">
          <table className="w-full border-collapse border border-primary-color">
            <thead>
              <tr className="bg-primary-color text-light-color">
                <th colSpan={2} className="px-4 py-2 text-center">
                  <FormText type={"label-large"}>
                    Resumo das Informações
                  </FormText>
                </th>
              </tr>
            </thead>
            <tbody>
              {summaryData.map((row, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-light-color" : ""}
                >
                  <td className="border border-primary-color px-4 py-2 text-center">
                    {row.label}
                  </td>
                  <td className="border border-primary-color px-4 py-2 text-center">
                    {typeof row.value === "number"
                      ? formatNumber(row.value)
                      : typeof row.value === "string"
                      ? formatNumber(parseFloat(row.value))
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
