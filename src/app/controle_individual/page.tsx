"use client";
import Form from "../components/form/page";
import FormText from "../components/texts/page";
import FormInput from "../components/inputs/page";
import Button from "../components/buttons/page";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const IndividualProductionForm = () => {
  const router = useRouter();

  const [cowNumber, setCowNumber] = useState("");
  const [cowName, setCowName] = useState("");
  const [weightMilking1, setWeightMilking1] = useState("");
  const [weightMilking2, setWeightMilking2] = useState("");
  const [weightMilking3, setWeightMilking3] = useState("");
  const [error, setError] = useState("");

  const cowNumberRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!cowNumber && !cowName) {
      setError("Por favor, insira um nome ou um número para identificação");
      return;
    }

    if (!weightMilking1) {
      setError("Por favor, insira uma pesagem.");
      return;
    }
    setError("");
    console.log(
      "🚀  cowNumber: " + cowNumber,
      "cowName: " + cowName,
      "weightMilking1: " + weightMilking1,
      "weightMilking2: " + weightMilking2,
      "weightMilking3: " + weightMilking3
    );
    setCowNumber("");
    setCowName("");
    setWeightMilking1("");
    setWeightMilking2("");
    setWeightMilking3("");

    setTimeout(() => {
      cowNumberRef.current?.focus();
    }, 500);

    const topElement = document.getElementById("top");
    topElement?.scrollIntoView({ behavior: "smooth" });
  };

  const finishProductionControl = () => {
    if (
      cowNumber !== "" ||
      cowName !== "" ||
      weightMilking1 !== "" ||
      weightMilking2 !== "" ||
      weightMilking3 !== ""
    ) {
      setError("Por favor, salve os dados antes de finalizar.");
      return;
    }
    router.push("/controle_final");
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <div id="top"></div>
      <FormText type="title">Insira os dados do animal:</FormText>

      <FormText type="label-large">Número</FormText>
      <FormInput
        size="large"
        type={"number"}
        value={cowNumber}
        onChange={(e) => setCowNumber(e.target.value)}
        ref={cowNumberRef}
      />

      <FormText type="label-large">Nome:</FormText>
      <FormInput
        size="large"
        type={"text"}
        value={cowName}
        onChange={(e) => setCowName(e.target.value)}
      />

      <ul className="flex gap-4 flex-nowrap mb-8">
        <li className="flex flex-col items-center">
          <FormText type="label-short">Ordenha 1:</FormText>
          <FormInput
            size="short"
            type={"number"}
            value={weightMilking1}
            onChange={(e) => setWeightMilking1(e.target.value)}
          />
        </li>
        <li className="flex flex-col items-center">
          <FormText type="label-short">Ordenha 2:</FormText>
          <FormInput
            size="short"
            type={"number"}
            value={weightMilking2}
            onChange={(e) => setWeightMilking2(e.target.value)}
          />
        </li>
        <li className="flex flex-col items-center">
          <FormText type="label-short">Ordenha 3:</FormText>
          <FormInput
            size="short"
            type={"number"}
            value={weightMilking3}
            onChange={(e) => setWeightMilking3(e.target.value)}
          />
        </li>
      </ul>

      {error && <FormText type="error">{error}</FormText>}

      <Button type="submit">Próximo Animal</Button>
      <Button type="button" onClick={finishProductionControl}>
        Finalizar Pesagem
      </Button>
    </Form>
  );
};

export default IndividualProductionForm;
