"use client";
import { useRouter } from "next/navigation";
import Form from "../components/form/page";
import FormText from "../components/texts/page";
import FormInput from "../components/inputs/page";
import Button from "../components/buttons/page";
import { useState } from "react";

const ProductionDateForm = () => {
  const router = useRouter();

  const [date, setDate] = useState("2024-05-01");
  const [error, setError] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      setError("Por favor, insira uma data.");
      return;
    }

    setError("");
    console.log("🚀 date: " + date);
    router.push("/controle_individual");
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <FormText type="title">Informe a data do controle leiteiro:</FormText>

      <FormInput
        size="large"
        type={"date"}
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {error && <FormText type="error">{error}</FormText>}

      <Button type="submit">Iniciar</Button>
    </Form>
  );
};

export default ProductionDateForm;
