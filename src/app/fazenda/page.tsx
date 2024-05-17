"use client";
import { useRouter } from "next/navigation";
import Form from "../components/form/page";
import FormText from "../components/texts/page";
import FormInput from "../components/inputs/page";
import Button from "../components/buttons/page";
import { useState } from "react";

const FarmForm = () => {
  const router = useRouter();

  const [farm, setFarm] = useState("Fazenda Teste1");
  const [error, setError] = useState("");

  const farmList = ["Fazenda Teste1", "Fazenda Teste2"];

  const handleSelectChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    setFarm(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!farm) {
      setError("Por favor, selecione uma fazenda.");
      return;
    }

    setError("");
    console.log("🚀  farm: " + farm);
    router.push("/atividades");
  };

  const newFarm = () => {
    router.push("/cadastro_fazenda");
  }

  return (
    <Form onSubmit={handleFormSubmit}>
      <FormText type="title">FAZENDA:</FormText>

      <FormText type="label-large">
        Qual o nome da Fazenda ou do Retiro onde será feita a medição:
      </FormText>
      <FormInput
        size="select"
        type="select"
        value={farm}
        onChange={handleSelectChange}
        options={farmList.map((farm) => ({ label: farm, value: farm }))}
      />

      {error && <FormText type="error">{error}</FormText>}

      <Button type="submit">Selecionar</Button>
      <Button type="button" onClick={newFarm}>Nova Fazenda</Button>
    </Form>
  );
};

export default FarmForm;
