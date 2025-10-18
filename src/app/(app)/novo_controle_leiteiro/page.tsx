"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Form from "../components/form/page";
import FormText from "../components/texts/page";
import FormInput from "../components/inputs/page";
import Button from "../components/buttons/page";

interface DateControl {
  dairyDateControl: string;
}

const ProductionDateForm: React.FC = () => {
  const router = useRouter();

  const [controlDate, setControlDate] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dateControlList, setDateControlList] = useState<DateControl[]>([]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!controlDate) {
      setError("Por favor, insira uma data.");
      return;
    }

    if (dateControlList?.some((date) => date.dairyDateControl.split('T')[0] === controlDate)) {
      alert("Já existe um controle leiteiro nesta data!");
      return;
    }

    setError("");
    setIsLoading(true);

    localStorage.setItem("controlDate", controlDate);
    localStorage.setItem("newControl", "true");

    router.push(`/controle_individual`);
  };

  useEffect(() => {
    const savedDates = localStorage.getItem('controlDateList');
    if (savedDates) {
      setDateControlList(JSON.parse(savedDates));
    }
    setIsLoading(false);
  }, []);


  const goBack = () => {
    setIsLoading(true);
    router.replace("/controle_leiteiro");
  };

  return (
    <Form onSubmit={handleFormSubmit} animatePulse={isLoading}>
      <FormText type="title">Informe a data do controle leiteiro:</FormText>

      <FormInput
        size="large"
        type={"date"}
        value={controlDate}
        onChange={(e) => setControlDate(e.target.value)}
      />

      {error && <FormText type="error">{error}</FormText>}

      <Button type="submit">Iniciar</Button>
      <Button type="button" onClick={goBack}>
        Voltar
      </Button>
    </Form>
  );
};

export default ProductionDateForm;
