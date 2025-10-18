"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import useSWR, { mutate } from "swr";
import { formatDateForDisplay } from '../../utils/formatters';
import Form from "../components/form/page";
import FormText from "../components/texts/page";
import FormInput from "../components/inputs/page";
import Button from "../components/buttons/page";

interface DateControl {
  dairyDateControl: string;
  dairyDateControlFormatted?: string;
}

const fetcher = async (url: string) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const ControlsDatesForm: React.FC = () => {
  const router = useRouter();
  const farmId =
    typeof window !== "undefined" ? localStorage.getItem("farmId") : null;
  const farmerId =
    typeof window !== "undefined" ? localStorage.getItem("farmerId") : null;

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
    revalidateOnFocus: false,
    revalidateOnMount: true,
  });

  useEffect(() => {
    if (dateControlListLoading) {
      setIsLoading(true);
      return;
    }

    if (dateControlListError) {
      setError("Erro ao carregar datas");
      setIsLoading(false);
      return;
    }

    if (Array.isArray(dateControlList) && dateControlList.length > 0) {
      const sortedDateList = [...dateControlList].sort(
        (a, b) =>
          new Date(b.dairyDateControl).getTime() -
          new Date(a.dairyDateControl).getTime()
      );
      setControlDate(sortedDateList[0].dairyDateControl);
      localStorage.setItem("controlDateList", JSON.stringify(dateControlList));
      mutate(apiDairyControlUrl, sortedDateList, false);
    }

    setIsLoading(false);
  }, [
    apiDairyControlUrl,
    dateControlList,
    dateControlListError,
    dateControlListLoading,
  ]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!controlDate) {
      setError("Por favor, insira uma data.");
      return;
    }

    setError("");
    setIsLoading(true);

    localStorage.setItem("controlDate", controlDate);
    localStorage.setItem("newControl", "false");

    router.push(`/controle_individual`);
  };

  const handleNewControl = () => {
    setIsLoading(true);
    router.push("/novo_controle_leiteiro");
  };

  const goBack = () => {
    setIsLoading(true);
    localStorage.removeItem("controlDate");
    localStorage.removeItem("newControl");
    localStorage.removeItem("controlDateList");
    router.replace("/atividades");
  };

  const hasControls =
    Array.isArray(dateControlList) && dateControlList.length > 0;

  return (
    <Form onSubmit={handleFormSubmit} animatePulse={isLoading}>
      <FormText type="title">Selecione a data</FormText>

      {hasControls ? (
        <>
          <FormText type="label-large">
            do controle leiteiro para atualizar:
          </FormText>

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
              .map((date: DateControl) => ({
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
      <Button type="button" onClick={handleNewControl}>
        Novo controle
      </Button>
      <Button type="button" onClick={goBack}>
        Voltar
      </Button>
    </Form>
  );
};

export default ControlsDatesForm;
