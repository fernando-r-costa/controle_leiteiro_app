"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import Form from "../components/form/page";
import FormText from "../components/texts/page";
import FormInput from "../components/inputs/page";
import Button from "../components/buttons/page";

interface DateControl {
  dairyDateControl: string;
}

const fetcher = async (url: string) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const ReportsDateForm: React.FC = () => {
  const router = useRouter();
  const farmerId =
    typeof window !== "undefined" ? localStorage.getItem("farmerId") : null;
  const farmId =
    typeof window !== "undefined" ? localStorage.getItem("farmId") : null;

  const [controlDate, setControlDate] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const apiDairyControlUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}dairy-control/farmer/${farmerId}/farm/${farmId}/dates`;

  const {
    data: dateControlList,
    error: dateControlListError,
    isLoading: dateControlListLoading,
  } = useSWR<DateControl[]>(apiDairyControlUrl, fetcher, {
    dedupingInterval: 0,
    refreshInterval: 0,
    revalidateOnFocus: true,
    revalidateOnMount: true,
  });

  useEffect(() => {
    if (dateControlListLoading) {
      setIsLoading(true);
      return;
    }

    if (dateControlListError) {
      setError("Erro ao carregar datas");
    }

    setIsLoading(false);
  }, [dateControlListError, dateControlListLoading]);

  useEffect(() => {
    if (Array.isArray(dateControlList) && dateControlList.length > 0) {
      const sortedDates = [...dateControlList].sort(
        (a, b) =>
          new Date(b.dairyDateControl).getTime() -
          new Date(a.dairyDateControl).getTime()
      );
      setControlDate(sortedDates[0].dairyDateControl);
    }
  }, [dateControlList]);

  const formatDateForDisplay = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!controlDate) {
      setError("Por favor, insira uma data.");
      return;
    }

    setError("");
    setIsLoading(true);
    localStorage.setItem("controlDate", controlDate);
    router.push(`/relatorio_final`);
  };

  const goBack = () => {
    setIsLoading(true);
    router.replace("/atividades");
  };

  const hasControls =
    Array.isArray(dateControlList) && dateControlList.length > 0;

  return (
    <Form onSubmit={handleFormSubmit} animatePulse={isLoading}>
      <FormText type="title">Selecione a data</FormText>
      <FormText type="label-large">
        para o relatório do controle leiteiro:
      </FormText>

      {hasControls ? (
        <>
          <FormInput
            size="select"
            type="select"
            value={controlDate}
            onChange={(e) => setControlDate(e.target.value)}
            options={dateControlList
              .slice()
              .sort(
                (a, b) =>
                  new Date(b.dairyDateControl).getTime() -
                  new Date(a.dairyDateControl).getTime()
              )
              .map((date) => ({
                label: formatDateForDisplay(date.dairyDateControl),
                value: date.dairyDateControl,
              }))}
          />
        </>
      ) : (
        <FormText type="label-large">
          Não há controles leiteiros registrados.
        </FormText>
      )}

      {error && <FormText type="error">{error}</FormText>}

      {hasControls && <Button type="submit">Selecionar</Button>}
      <Button type="button" onClick={goBack}>
        Voltar
      </Button>
    </Form>
  );
};

export default ReportsDateForm;
