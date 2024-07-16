"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import Table from "../components/table/page";
import Form from "../components/form/page";
import FormText from "../components/texts/page";
import Button from "../components/buttons/page";

interface DairyControl {
  registerId: number;
  dairyDateControl: string;
  animalId: number;
  weightMilking1: string;
  weightMilking2?: string;
  weightMilking3?: string;
  dim?: number;
  dtc?: number;
  animal: {
    animalId: number;
    name: string;
    number: string;
    farm: {
      farmId: number;
      name: string;
    };
  };
}

interface TableData {
  cowNumber?: string | number;
  cowName?: string;
  dim: number;
  dtc?: number;
  weightMilking1: number;
  weightMilking2?: number;
  weightMilking3?: number;
  production?: string;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const TableForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const farmerId = params.get("farmerId");
  const farmId = params.get("farmId");
  const controlDate = params.get("controlDate");

  const [tableData, setTableData] = useState<TableData[]>([]);
  const [title, setTitle] = useState<{ farm: string; date: string }>({
    farm: "",
    date: "",
  });
  console.log("🚀  title:", title);
  const [error, setError] = useState("");

  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}dairy-control/farm/${farmId}/date/${controlDate}`;
  const {
    data: dairyControlList,
    error: dairyControlError,
    isLoading,
  } = useSWR<DairyControl[]>(apiUrl, fetcher);

  useEffect(() => {
    if (dairyControlError) {
      setError("Erro ao carregar os dados");
    } else {
      setError("");
    }
  }, [dairyControlError]);

  useEffect(() => {
    if (dairyControlList && dairyControlList.length > 0) {
      const formattedData = dairyControlList.map((item) => ({
        cowNumber: item.animal.number,
        cowName: item.animal.name,
        dim: item.dim || 0,
        dtc: item.dtc || 0,
        weightMilking1: parseFloat(item.weightMilking1) || 0,
        weightMilking2: parseFloat(item.weightMilking2 || "0") || 0,
        weightMilking3: parseFloat(item.weightMilking3 || "0") || 0,
      }));
      setTableData(formattedData);

      const firstItem = dairyControlList[0];
      const [year, month, day] = firstItem.dairyDateControl.split("-");
      const dairyDateControlFormatted = `${day}/${month}/${year}`;

      setTitle({
        farm: dairyControlList[0].animal.farm.name,
        date: dairyDateControlFormatted,
      });
    }
  }, [dairyControlList]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/atividades?farmerId=${farmerId}&farmId=${farmId}`);
  };

  return (
    <Form onSubmit={handleFormSubmit} animatePulse={isLoading}>
      <Table data={tableData} title={title} />

      {error && <FormText type="error">{error}</FormText>}

      <Button type="submit">Fechar</Button>
    </Form>
  );
};

export default TableForm;
