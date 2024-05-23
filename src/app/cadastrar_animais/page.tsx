"use client";
import { useRouter } from "next/navigation";
import Form from "../components/form/page";
import FormText from "../components/texts/page";
import FormInput from "../components/inputs/page";
import Button from "../components/buttons/page";
import { useState } from "react";

const CowRegisterForm = () => {
  const router = useRouter();

  const [cowName, setCowName] = useState("Mimosa");
  const [cowNumber, setNumber] = useState("1234");
  const [calvingDate, setCalvingDate] = useState("2024-01-01");
  const [expectedDate, setExpectedDate] = useState("2025-01-01");
  const [error, setError] = useState("");
  const [selectedButton, setSelectedButton] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!cowName && !cowNumber) {
      setError("Por favor, insira um nome ou um número para identificação.");
      return;
    }

    if (!calvingDate) {
      setError("Por favor, insira uma data de parto.");
      return;
    }

    setError("");
    console.log(
      "🚀 cowName: " + cowName,
      "number: " + cowNumber,
      "calvingDate: " + calvingDate,
      "expectedDate: " + expectedDate
    );

    if (selectedButton === "Cadastrar") {
      router.back();
    }

    setCowName("");
    setNumber("");
    setCalvingDate("");
    setExpectedDate("");

    const topElement = document.getElementById("top");
    topElement?.scrollIntoView({ behavior: "smooth" });
  };

  const goBack = () => {
    router.back();
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <div id="top"></div>
      <FormText type="title">CADASTRAR NOVO ANIMAL:</FormText>

      <FormText type="label-large">NOME:</FormText>
      <FormInput
        size="large"
        type={"text"}
        value={cowName}
        onChange={(e) => setCowName(e.target.value)}
      />

      <FormText type="label-large">NÚMERO:</FormText>
      <FormInput
        size="large"
        type={"text"}
        value={cowNumber}
        onChange={(e) => setNumber(e.target.value)}
      />

      <FormText type="label-large">DATA DO PARTO:</FormText>
      <FormInput
        size="large"
        type={"date"}
        value={calvingDate}
        onChange={(e) => setCalvingDate(e.target.value)}
      />

      <FormText type="label-large">PREVISÃO DO PARTO:</FormText>
      <FormInput
        size="large"
        type={"date"}
        value={expectedDate}
        onChange={(e) => setExpectedDate(e.target.value)}
      />

      {error && <FormText type="error">{error}</FormText>}

      <Button type="submit" onClick={() => setSelectedButton("Cadastrar")}>
        Cadastrar
      </Button>
      <Button
        type="submit"
        onClick={() => setSelectedButton("Cadastrar outros")}
      >
        Cadastrar outros
      </Button>
      <Button type="button" onClick={goBack}>
        Voltar
      </Button>
    </Form>
  );
};

export default CowRegisterForm;
