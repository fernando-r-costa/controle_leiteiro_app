"use client";
import Form from "../components/form/page";
import FormText from "../components/texts/page";
import FormInput from "../components/inputs/page";
import Button from "../components/buttons/page";
import { useState } from "react";
import { useRouter } from "next/navigation";

const IndividualForm = () => {
  const router = useRouter();

  const [cowNumber, setCowNumber] = useState("");
  const [cowName, setCowName] = useState("");
  const [calvingDate, setCalvingDate] = useState("");
  const [weightMilking1, setWeightMilking1] = useState("");
  const [weightMilking2, setWeightMilking2] = useState("");
  const [weightMilking3, setWeightMilking3] = useState("");
  const [error, setError] = useState("");

  const saveData = () => {
    if (!cowNumber || !cowName) {
      setError("Por favor, insira um dos dados do animal");
      return;
    }
    if (!calvingDate) {
      setError("Por favor, insira uma data.");
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
      "calvingDate: " + calvingDate,
      "weightMilking1: " + weightMilking1,
      "weightMilking2: " + weightMilking2,
      "weightMilking3: " + weightMilking3
    );
    setCowNumber("");
    setCowName("");
    setCalvingDate("");
    setWeightMilking1("");
    setWeightMilking2("");
    setWeightMilking3("");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveData();
    router.push("/endForm");
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <FormText type="title">Insira os dados do animal:</FormText>

      <FormText type="label-large">Número</FormText>
      <FormInput
        size="large"
        type={"number"}
        value={cowNumber}
        onChange={(e) => setCowNumber(e.target.value)}
      />

      <FormText type="label-large">Nome:</FormText>
      <FormInput
        size="large"
        type={"text"}
        value={cowName}
        onChange={(e) => setCowName(e.target.value)}
      />

      <FormText type="label-large">Data Parto:</FormText>
      <FormInput
        size="large"
        type={"date"}
        value={calvingDate}
        onChange={(e) => setCalvingDate(e.target.value)}
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

      <ul className="flex gap-4 flex-nowrap">
        <Button type="button" onClick={() => saveData()}>
          Próximo Animal
        </Button>
        <Button type="submit">Finalizar Pesagem</Button>
      </ul>
    </Form>
  );
};

export default IndividualForm;
