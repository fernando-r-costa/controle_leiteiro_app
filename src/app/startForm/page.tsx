"use client";
import { useRouter } from "next/navigation";
import { Form } from "../components/form/page";
import { FormError, FormLabelLarge, FormTitle } from "../components/texts/page";
import { FormInputLarge } from "../components/inputs/page";
import { Button } from "../components/buttons/page";
import { useState } from "react";

const StartForm = () => {
  const router = useRouter();

  const [farm, setFarm] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!farm) {
      setError("Por favor, insira uma Fazenda válida.");
      return;
    }
    if (!date) {
      setError("Por favor, insira uma data.");
      return;
    }

    setError("");
    console.log("🚀  farm: " + farm, "date: " + date);
    router.push("/individualForm");
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <FormTitle>Dados iniciais:</FormTitle>

      <FormLabelLarge>
        Qual o nome da Fazenda ou do Retiro onde será feita a medição:
      </FormLabelLarge>
      <FormInputLarge
        type={"text"}
        value={farm}
        onChange={(e) => setFarm(e.target.value)}
      />

      <FormLabelLarge>Informe a data da medição:</FormLabelLarge>
      <FormInputLarge
        type={"date"}
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {error && <FormError>{error}</FormError>}

      <Button type="submit">Iniciar</Button>
    </Form>
  );
};

export default StartForm;
