"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Form from "../components/form/page";
import FormText from "../components/texts/page";
import FormInput from "../components/inputs/page";
import Button from "../components/buttons/page";

const FarmRegisterForm = () => {
  const router = useRouter();
  const farmerId =
    typeof window !== "undefined" ? localStorage.getItem("farmerId") : null;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const [farmName, setFarmName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const apiFarmUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}farm`;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!farmName) {
      setError("Por favor, insira um nome para a Fazenda.");
      return;
    }

    setError("");
    setIsLoading(true);

    const farmData = {
      name: farmName,
      farmerId: farmerId,
    };

    try {
      await axios.post(apiFarmUrl, farmData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.push(`/fazenda`);
    } catch (error: any) {
      setIsLoading(false);
      setError(error.response?.data?.error || "Erro ao cadastrar Fazenda");
    }
  };

  const goBack = () => {
    setIsLoading(true);
    router.back();
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

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
