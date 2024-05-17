"use client";
import { useRouter } from "next/navigation";
import Form from "../components/form/page";
import FormText from "../components/texts/page";
import FormInput from "../components/inputs/page";
import Button from "../components/buttons/page";
import { useState } from "react";

const FarmRegisterForm = () => {
  const router = useRouter();

  const [farmName, setFarmName] = useState("Fazenda Teste 1");
  const [error, setError] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!farmName) {
      setError("Por favor, insira um nome para a Fazenda.");
      return;
    }

    setError("");
    console.log("🚀 fazenda: " + farmName);
    router.push("/fazenda");
  };

  const goBack = () => {
    router.back();
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <FormText type="title">CADASTRAR NOVA FAZENDA:</FormText>

      <FormText type="label-large">NOME DA FAZENDA:</FormText>
      <FormInput
        size="large"
        type={"text"}
        value={farmName}
        onChange={(e) => setFarmName(e.target.value)}
      />

      {error && <FormText type="error">{error}</FormText>}

      <Button type="submit">Cadastrar</Button>
      <Button type="button" onClick={goBack}>
        Voltar
      </Button>
    </Form>
  );
};

export default FarmRegisterForm;
