"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import axios from "axios";
import Form from "../components/form/page";
import FormText from "../components/texts/page";
import FormInput from "../components/inputs/page";
import Button from "../components/buttons/page";

export interface Animal {
  animalId: number;
  name?: string;
  number: string;
  calvingDate: string;
  expectedDate?: string;
  farmId: number;
}

const fetcher = async (url: string) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const CowRegisterForm = () => {
  const router = useRouter();
  const farmId =
    typeof window !== "undefined" ? localStorage.getItem("farmId") : null;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  const farmerId =
    typeof window !== "undefined" ? localStorage.getItem("farmerId") : null;

  const [cowName, setCowName] = useState("");
  const [cowNumber, setNumber] = useState("");
  const [calvingDate, setCalvingDate] = useState("");
  const [expectedDate, setExpectedDate] = useState("");
  const [error, setError] = useState("");
  const [selectedButton, setSelectedButton] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const apiAnimalUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}animal`;
  const {
    data: cowList,
    error: cowListError,
    isLoading: cowListLoading,
  } = useSWR<Animal[]>(
    `${apiAnimalUrl}/farmer/${farmerId}/farm/${farmId}`,
    fetcher
  );

  useEffect(() => {
    if (cowListLoading) {
      setIsLoading(false);
    }
    if (cowListError) {
      setError("Erro ao carregar animais");
    } else {
      setError("");
      setIsLoading(false);
    }
  }, [cowListError, cowListLoading]);

  const findByNumber = cowList?.find((cow) => cow.number === cowNumber);

  useEffect(() => {
    setCowName(findByNumber?.name || "");
    setCalvingDate(findByNumber?.calvingDate || "");
    setExpectedDate(findByNumber?.expectedDate || "");
  }, [findByNumber]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cowNumber) {
      setError("Por favor, insira um número para identificação.");
      return;
    }

    if (!calvingDate) {
      setError("Por favor, insira uma data de parto.");
      return;
    }

    setError("");
    setIsLoading(true);

    const animalData = {
      animalId: findByNumber?.animalId,
      name: cowName || null,
      number: cowNumber,
      calvingDate: calvingDate,
      expectedDate: expectedDate || null,
      farmerId: farmerId ? parseInt(farmerId) : null,
      farmId: farmId ? parseInt(farmId) : null,
    };
    console.log("🚀  animalData:", animalData);

    try {
      if (!findByNumber) {
        await axios.post(apiAnimalUrl, animalData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.put(apiAnimalUrl, animalData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (error: any) {
      setError(error.response?.data?.error || "Os dados não foram salvos!");
      setIsLoading(false);
      return;
    }

    if (selectedButton === "Cadastrar outros") {
      mutate(`${apiAnimalUrl}/farm/${farmId}`);

      setCowName("");
      setNumber("");
      setCalvingDate("");
      setExpectedDate("");
      setIsLoading(false);

      const topElement = document.getElementById("top");
      topElement?.scrollIntoView({ behavior: "smooth" });
    }

    if (selectedButton === "Cadastrar") {
      setIsLoading(false);
      router.back();
    }
  };

  const goBack = () => {
    router.back();
  };

  return (
    <Form onSubmit={handleFormSubmit} animatePulse={isLoading}>
      <div id="top"></div>
      <FormText type="title">CADASTRAR NOVO ANIMAL:</FormText>

      <FormText type="label-large">NÚMERO:</FormText>
      <FormInput
        size="large"
        type={"text"}
        value={cowNumber}
        onChange={(e) => setNumber(e.target.value)}
      />

      <FormText type="label-large">NOME:</FormText>
      <FormInput
        size="large"
        type={"text"}
        value={cowName}
        onChange={(e) => setCowName(e.target.value)}
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
