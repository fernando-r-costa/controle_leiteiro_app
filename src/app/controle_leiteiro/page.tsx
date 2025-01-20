"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Form from "../components/form/page";
import FormText from "../components/texts/page";
import FormInput from "../components/inputs/page";
import Button from "../components/buttons/page";

const ProductionDateForm: React.FC = () => {
  const router = useRouter();
  const params = useSearchParams();
  const farmerId = params.get("farmerId");
  const farmId = params.get("farmId");

  const [controlDate, setControlDate] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!controlDate) {
      setError("Por favor, insira uma data.");
      return;
    }

    setError("");
    router.push(
      `/controle_individual?farmerId=${farmerId}&farmId=${farmId}&controlDate=${controlDate}`
    );
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <FormText type="title">Informe a data do controle leiteiro:</FormText>

      <FormInput
        size="large"
        type={"date"}
        value={controlDate}
        onChange={(e) => setControlDate(e.target.value)}
      />

      {error && <FormText type="error">{error}</FormText>}

      <Button type="submit">Iniciar</Button>
    </Form>
  );
};

export default ProductionDateForm;
