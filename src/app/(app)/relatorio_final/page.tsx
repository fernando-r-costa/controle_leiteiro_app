"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import Table from "../components/table/page";
import Form from "../components/form/page";
import FormText from "../components/texts/page";
import Button from "../components/buttons/page";

interface Farm {
  farmId: number;
  name: string;
}

interface Animal {
  animalId: number;
  name: string;
  number: string;
  farm: Farm;
}

interface DairyControl {
  registerId: number;
  dairyDateControl: string;
  animalId: number;
  weightMilking1: string;
  weightMilking2?: string;
  weightMilking3?: string;
  dim?: number;
  dtc?: number;
  animal: Animal;
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

const fetcher = async (url: string) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const TableForm: React.FC = () => {
  const router = useRouter();
  const farmerId =
    typeof window !== "undefined" ? localStorage.getItem("farmerId") : null;
  const farmId =
    typeof window !== "undefined" ? localStorage.getItem("farmId") : null;
  const controlDate =
    typeof window !== "undefined" ? localStorage.getItem("controlDate") : null;
  const farmName =
    typeof window !== "undefined" ? localStorage.getItem("farmName") : null;

  const [tableData, setTableData] = useState<TableData[]>([]);
  const [title, setTitle] = useState<{ farm: string; date: string }>({
    farm: farmName || "",
    date: controlDate ? new Date(controlDate).toLocaleDateString("pt-BR", {
    timeZone: 'UTC',
  }) : "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const apiDairyControlUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}dairy-control`;
  const {
    data: dairyControlList,
    error: dairyControlError,
    isLoading: dairyControlLoading,
  } = useSWR<DairyControl[]>(
    `${apiDairyControlUrl}/farmer/${farmerId}/farm/${farmId}/date/${controlDate}`,
    fetcher,
    {
      dedupingInterval: 0,
      refreshInterval: 0,
      revalidateOnFocus: false,
      revalidateOnMount: true,
    }
  );

  useEffect(() => {
    if (dairyControlLoading) {
      setIsLoading(true);
      return;
    }

    if (dairyControlError) {
      setError("Erro ao carregar os dados");
    }

    setIsLoading(false);
  }, [dairyControlError, dairyControlLoading]);

  useEffect(() => {
    if (Array.isArray(dairyControlList) && dairyControlList.length > 0) {
      const sortedList = [...dairyControlList].sort((a, b) =>
        a.animal.number.localeCompare(b.animal.number, undefined, { numeric: true })
      );

      const formattedData = sortedList.map((item) => ({
        cowNumber: item.animal.number,
        cowName: item.animal.name,
        dim: item.dim || 0,
        dtc: item.dtc || 0,
        weightMilking1: parseFloat(item.weightMilking1) || 0,
        weightMilking2: parseFloat(item.weightMilking2 || "0"),
        weightMilking3: parseFloat(item.weightMilking3 || "0"),
      }));

      setTableData(formattedData);
    }
  }, [dairyControlList]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    router.replace("/atividades");
  };

  return (
    <Form onSubmit={handleFormSubmit} animatePulse={isLoading}>
      {dairyControlList && dairyControlList.length > 0 ? (
        <Table data={tableData} title={title} />
      ) : (
        <FormText type="label-large">Não há dados para exibir.</FormText>
      )}

      {error && <FormText type="error">{error}</FormText>}

      <Button type="submit">Voltar</Button>
    </Form>
  );
};

export default TableForm;