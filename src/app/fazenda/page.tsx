"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import useSWR from "swr";
import Form from "../components/form/page";
import FormText from "../components/texts/page";
import FormInput from "../components/inputs/page";
import Button from "../components/buttons/page";

interface Farm {
  farmId: number;
  name: string;
  farmerId: number;
}

const fetcher = async (url: string) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const FarmForm = () => {
  const router = useRouter();

  const [farmId, setFarmId] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const farmerId =
    typeof window !== "undefined" ? localStorage.getItem("farmerId") : null;
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}farm/farmer/${farmerId}`;
  const {
    data: farmList,
    error: farmError,
    isLoading,
  } = useSWR<Farm[]>(apiUrl, fetcher);

  useEffect(() => {
    if (farmError) {
      console.error("Erro ao carregar fazendas:", farmError);
      setError("Erro ao carregar fazendas!");
    }
  }, [farmError]);

  useEffect(() => {
    if (farmList && farmList.length > 0) {
      setFarmId(Number(farmList[0].farmId));
    }
  }, [farmList]);

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFarmId(Number(e.target.value));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!farmId) {
      setError("Por favor, selecione uma fazenda.");
      return;
    }

    setError("");
    if (typeof window !== "undefined") {
      localStorage.setItem("farmId", farmId.toString());
    }
    router.push("/atividades");
  };

  const newFarm = () => {
    router.push(`/cadastro_fazenda`);
  };

  const logout = () => {
    setFarmId(0);
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("farmerId");
      localStorage.removeItem("farmId");
    }
    router.push("/");
  };

  return (
    <Form onSubmit={handleFormSubmit} animatePulse={isLoading}>
      <FormText type="title">FAZENDA:</FormText>

      <FormText type="label-large">
        Qual o nome da Fazenda ou do Retiro onde será feita a medição:
      </FormText>

      <FormInput
        size="select"
        type="select"
        value={farmId}
        onChange={handleSelectChange}
        options={farmList?.map((farm) => ({
          label: farm.name,
          value: String(farm.farmId),
        }))}
      />

      {error && <FormText type="error">{error}</FormText>}

      <Button type="submit">Selecionar</Button>
      <Button type="button" onClick={newFarm}>
        Nova Fazenda
      </Button>
      <Button type="button" onClick={logout}>
        Sair
      </Button>
    </Form>
  );
};

export default FarmForm;
