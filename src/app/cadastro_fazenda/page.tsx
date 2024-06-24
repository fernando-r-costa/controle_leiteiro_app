"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Form from "../components/form/page";
import FormText from "../components/texts/page";
import FormInput from "../components/inputs/page";
import Button from "../components/buttons/page";
import axios from "axios";

const FarmRegisterForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const farmerId = params.get("farmerId");
  const farmerIdNumber = farmerId ? parseInt(farmerId) : null;

  const [farmName, setFarmName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const apiFarmUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}farm`;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!farmName) {
      setError("Por favor, insira um nome para a Fazenda.");
      return;
    }

    setError("");

    const farmData = {
      name: farmName,
      farmerId: farmerIdNumber,
    };

    setIsLoading(true)

    axios
      .post(apiFarmUrl, farmData)
      .then(() => {
        router.push(`/fazenda?farmerId=${farmerId}`);
        setIsLoading(false)
      })
      .catch(() => {
        setError("Erro ao cadastrar Fazenda");
        setIsLoading(false)
      });
  };

  const goBack = () => {
    router.back();
  };

  return (
    <Form onSubmit={handleFormSubmit} animatePulse={isLoading}>
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
