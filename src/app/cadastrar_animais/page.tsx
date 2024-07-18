"use client";
import { useRouter, useSearchParams } from "next/navigation";
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

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const CowRegisterForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const farmId = params.get("farmId");
  const farmIdNumber = farmId ? parseInt(farmId) : null;

  const [cowName, setCowName] = useState("");
  const [cowNumber, setNumber] = useState("");
  const [calvingDate, setCalvingDate] = useState("");
  const [expectedDate, setExpectedDate] = useState("");
  const [error, setError] = useState("");
  const [selectedButton, setSelectedButton] = useState("");
  const [isLoading, setIsLoading] = useState(true)

  const apiAnimalUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}animal`;
  const {
    data: cowList,
    error: cowListError,
    isLoading: cowListLoading,
  } = useSWR<Animal[]>(`${apiAnimalUrl}/farm/${farmId}`, fetcher);

    useEffect(() => {
    if (cowListLoading) {
      setIsLoading(false)
    }
    if (cowListError) {
      setError("Erro ao carregar animais");
    } else {
      setError("");
      setIsLoading(false)
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
      farmId: farmIdNumber,
    };

    try {
      if (!findByNumber) {
        await axios.post(apiAnimalUrl, animalData);
      } else {
        await axios.put(apiAnimalUrl, animalData);
      }
    } catch (error) {
      setError("Os dados não foram salvos!");
    }

    if (selectedButton === "Cadastrar outros") {
      mutate(`${apiAnimalUrl}/farm/${farmId}`);

      setCowName("");
      setNumber("");
      setCalvingDate("");
      setExpectedDate("");
      setIsLoading(false)

      const topElement = document.getElementById("top");
      topElement?.scrollIntoView({ behavior: "smooth" });
    }

    if (selectedButton === "Cadastrar") {
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
