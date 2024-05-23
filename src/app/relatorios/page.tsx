import Table from "../components/table/page";

const TableForm = () => {
  const tableData = [
    {
      cowNumber: 11,
      cowName: "Mimosa",
      dim: 85,
      dtc: 205,
      production: 15.8,
    },
    {
      cowNumber: 12,
      cowName: "Flor",
      dim: 52,
      dtc: 255,
      production: 25.6,
    },
    {
      cowNumber: 13,
      cowName: "Nina",
      dim: 125,
      dtc: 185,
      production: 35.2,
    },
  ];

  const title = {
    farm: "Fazenda Teste",
    date: "01/05/2024",
  };

  return (
    <div>
      <Table data={tableData} title={title} />
    </div>
  );
};

export default TableForm;
