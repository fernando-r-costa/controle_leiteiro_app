"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import Form from "../components/form/page";
import FormText from "../components/texts/page";
import FormInput from "../components/inputs/page";
import Button from "../components/buttons/page";

interface DateControl {
  dairyDateControl: string;
  dairyDateControlFormatted?: string;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ReportsDateForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const farmerId = params.get("farmerId");
  const farmId = params.get("farmId");

  const [controlDate, setControlDate] = useState("");
  const [error, setError] = useState("");
  const [dateList, setDateList] = useState<DateControl[]>([]);

  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}dairy-control/farm/${farmId}/dates`;
  const {
    data: dateControlList,
    error: dateControlListError,
    isLoading,
  } = useSWR<DateControl[]>(apiUrl, fetcher);

  useEffect(() => {
    if (dateControlListError) {
      setError("Erro ao carregar datas");
    } else {
      setError("");
    }

    if (dateControlList) {
      const formattedDates = dateControlList.map((date: DateControl) => {
        const [year, month, day] = date.dairyDateControl.split("-");
        return {
          ...date,
          dairyDateControlFormatted: `${day}/${month}/${year}`,
        };
      });
      setDateList(formattedDates);
    }
  }, [dateControlList, dateControlListError]);

  useEffect(() => {
    if (dateList && dateList.length > 0) {
      setControlDate(dateList[0].dairyDateControl);
    }
  }, [dateList]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!controlDate) {
      setError("Por favor, insira uma data.");
      return;
    }

    setError("");
    router.push(
      `/relatorio_final?farmerId=${farmerId}&farmId=${farmId}&controlDate=${controlDate}`
    );
  };

  return (
    <Form onSubmit={handleFormSubmit} animatePulse={isLoading}>
      <FormText type="title">Selecione a data</FormText>

      <FormText type="label-large">
        para o relatório do controle leiteiro:
      </FormText>

        <FormInput
          size="select"
          type="select"
          value={controlDate}
          onChange={(e) => setControlDate(e.target.value)}
          options={dateList.map((date) => ({
            label: date.dairyDateControlFormatted || "",
            value: date.dairyDateControl,
          }))}
        />

      {error && <FormText type="error">{error}</FormText>}

      <Button type="submit">Selecionar</Button>
    </Form>
  );
};

export default ReportsDateForm;
