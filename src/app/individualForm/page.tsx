"use client";
import { Form } from "../components/form/page";
import {
  FormError,
  FormLabelLarge,
  FormLabelShort,
  FormTitle,
} from "../components/texts/page";
import { FormInputLarge, FormInputShort } from "../components/inputs/page";
import { Button } from "../components/buttons/page";
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
      <FormTitle>Insira os dados do animal:</FormTitle>

      <FormLabelLarge>Número</FormLabelLarge>
      <FormInputLarge
        type={"number"}
        value={cowNumber}
        onChange={(e) => setCowNumber(e.target.value)}
      />

      <FormLabelLarge>Nome:</FormLabelLarge>
      <FormInputLarge
        type={"text"}
        value={cowName}
        onChange={(e) => setCowName(e.target.value)}
      />

      <FormLabelLarge>Data Parto:</FormLabelLarge>
      <FormInputLarge
        type={"date"}
        value={calvingDate}
        onChange={(e) => setCalvingDate(e.target.value)}
      />

      <ul className="flex gap-4 flex-nowrap mb-8">
        <li className="flex flex-col items-center">
          <FormLabelShort>Ordenha 1:</FormLabelShort>
          <FormInputShort
            type={"number"}
            value={weightMilking1}
            onChange={(e) => setWeightMilking1(e.target.value)}
          />
        </li>
        <li className="flex flex-col items-center">
          <FormLabelShort>Ordenha 2:</FormLabelShort>
          <FormInputShort
            type={"number"}
            value={weightMilking2}
            onChange={(e) => setWeightMilking2(e.target.value)}
          />
        </li>
        <li className="flex flex-col items-center">
          <FormLabelShort>Ordenha 3:</FormLabelShort>
          <FormInputShort
            type={"number"}
            value={weightMilking3}
            onChange={(e) => setWeightMilking3(e.target.value)}
          />
        </li>
      </ul>

      {error && <FormError>{error}</FormError>}

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
