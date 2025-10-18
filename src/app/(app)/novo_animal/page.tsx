"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDateForInput, normalizeDateInputForBackend } from "../../utils/formatters";
import Form from "../components/form/page";
import FormText from "../components/texts/page";
import FormInput from "../components/inputs/page";
import Button from "../components/buttons/page";

export interface Animal {
  name?: string;
  number: string;
  calvingDate: string;
  expectedDate?: string | null;
  farmerId: number;
  farmId: number;
}

const NewCowForm: React.FC = () => {
  const router = useRouter();
  const farmerId =
    typeof window !== "undefined" ? localStorage.getItem("farmerId") : null;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  const farmId =
    typeof window !== "undefined" ? localStorage.getItem("farmId") : null;

  const [cowNumber, setCowNumber] = useState<string>("");
  const [cowName, setCowName] = useState<string>("");
  const [calvingDate, setCalvingDate] = useState<string | null>(null);
  const [expectedDate, setExpectedDate] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const apiAnimalUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}animal`;

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

    const formattedCalvingDate = normalizeDateInputForBackend(calvingDate);
    const formattedExpectedDate = normalizeDateInputForBackend(expectedDate);

    const animalData: Animal = {
      name: cowName || "",
      number: cowNumber,
      calvingDate: formattedCalvingDate as string,
      expectedDate: formattedExpectedDate,
      farmerId: farmerId ? parseInt(farmerId) : 0,
      farmId: farmId ? parseInt(farmId) : 0,
    };

    try {
      await axios.post(apiAnimalUrl, animalData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error: any) {
      setError(error.response?.data?.error || "Os dados não foram salvos!");
      setIsLoading(false);
      return;
    }

    setCowName("");
    setCowNumber("");
    setCalvingDate(null);
    setExpectedDate(null);

    const topElement = document.getElementById("top");
    topElement?.scrollIntoView({ behavior: "smooth" });
    setIsLoading(false);
  };

  const goBack = () => {
    setIsLoading(true);
    router.replace("/cadastro_animais");
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <Form onSubmit={handleFormSubmit} animatePulse={isLoading}>
      <div id="top"></div>
      <FormText type="title">NOVO ANIMAL:</FormText>

      <FormText type="label-large">NÚMERO:</FormText>
      <FormInput
        size="large"
        type={"text"}
        value={cowNumber}
        onChange={(e) => setCowNumber(e.target.value)}
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
        value={formatDateForInput(calvingDate)}
        onChange={(e) => {
          setCalvingDate(normalizeDateInputForBackend(e.target.value));
        }}
      />

      <FormText type="label-large">PREVISÃO DO PARTO:</FormText>
      <FormInput
        size="large"
        type={"date"}
        value={formatDateForInput(expectedDate)}
        onChange={(e) => {
          setExpectedDate(normalizeDateInputForBackend(e.target.value));
        }}
      />

      {error && <FormText type="error">{error}</FormText>}

      <Button type="submit">Cadastrar novo animal</Button>
      <Button type="button" onClick={goBack}>
        Voltar
      </Button>
    </Form>
  );
};

export default NewCowForm;
