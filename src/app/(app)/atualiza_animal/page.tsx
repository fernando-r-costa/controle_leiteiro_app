"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import axios from "axios";
import {
  formatDateForInput,
  normalizeDateInputForBackend,
} from "../../utils/formatters";
import Form from "../components/form";
import FormText from "../components/texts";
import FormInput from "../components/inputs";
import Button from "../components/buttons";

export interface Animal {
  animalId: number;
  name?: string;
  number: string;
  calvingDate: string;
  expectedDate?: string | null;
  farmerId: number;
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

const CowUpdateForm: React.FC = () => {
  const router = useRouter();
  const farmId =
    typeof window !== "undefined" ? localStorage.getItem("farmId") : null;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  const farmerId =
    typeof window !== "undefined" ? localStorage.getItem("farmerId") : null;

  const [cowNumber, setNumber] = useState<string>("");
  const [cowName, setCowName] = useState<string>("");
  const [animalId, setAnimalId] = useState<number>();
  const [calvingDate, setCalvingDate] = useState<string>("");
  const [expectedDate, setExpectedDate] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const apiAnimalUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}animal`;
  const {
    data: cowList,
    error: cowListError,
    isLoading: cowListLoading,
  } = useSWR<Animal[]>(
    token && farmerId && farmId
      ? `${apiAnimalUrl}/farmer/${farmerId}/farm/${farmId}`
      : null,
    fetcher,
    {
      dedupingInterval: 0,
      refreshInterval: 0,
      revalidateOnFocus: false,
      revalidateOnMount: true,
    }
  );

  const getPregnancyStatus = (expectedDate: string | null): string => {
    if (!expectedDate) return "";

    const today = new Date();
    const expected = new Date(expectedDate);
    const diffTime = expected.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 60 && diffDays > 0) return "(P+)";
    return "(P)";
  };

  useEffect(() => {
    if (cowListLoading) {
      setIsLoading(true);
      return;
    }

    if (cowListError) {
      setError("Erro ao carregar animais");
      setIsLoading(false);
    }

    if (cowList && cowList.length > 0) {
      const sortedCowList = [...cowList].sort(
        (a, b) => parseInt(a.number) - parseInt(b.number)
      );
      const firstCow = sortedCowList[0];
      setNumber(firstCow.number);
      setAnimalId(firstCow.animalId);
      setCowName(firstCow.name || "");
      setCalvingDate(firstCow.calvingDate);
      setExpectedDate(formatDateForInput(firstCow.expectedDate ?? null));

      mutate(
        `${apiAnimalUrl}/farmer/${farmerId}/farm/${farmId}`,
        sortedCowList,
        false
      );
    }
    setIsLoading(false);
  }, [apiAnimalUrl, cowList, cowListError, cowListLoading, farmId, farmerId]);

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const selectedValue = e.target.value;
    const selectedCow = cowList?.find(
      (cow) => `${cow.number}` === selectedValue
    );
    if (selectedCow) {
      setNumber(selectedCow.number);
      setAnimalId(selectedCow.animalId);
      setCowName(selectedCow.name || "");
      setCalvingDate(selectedCow.calvingDate);
      setExpectedDate(selectedCow.expectedDate || null);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    if (!token || !farmerId || !farmId) return;

    if (!calvingDate) {
      setError("Por favor, insira uma data de parto.");
      return;
    }

    setError("");
    setIsLoading(true);

    const formattedExpectedDate = normalizeDateInputForBackend(expectedDate);

    const animalData: Animal = {
      animalId: animalId || 0,
      name: cowName || "",
      number: cowNumber,
      calvingDate: calvingDate,
      expectedDate: formattedExpectedDate,
      farmerId: farmerId ? parseInt(farmerId) : 0,
      farmId: farmId ? parseInt(farmId) : 0,
    };

    try {
      await axios.put(apiAnimalUrl, animalData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await mutate(`${apiAnimalUrl}/farmer/${farmerId}/farm/${farmId}`);
    } catch (error: any) {
      setError(error.response?.data?.error || "Os dados não foram salvos!");
      setIsLoading(false);
      return;
    }

    const topElement = document.getElementById("top");
    topElement?.scrollIntoView({ behavior: "smooth" });
    setIsLoading(false);
  };

  const goBack = () => {
    setIsLoading(true);
    router.replace("/cadastro_animais");
  };

  const deleteAnimal = async () => {
    if (!token || !farmerId || !farmId) return;

    if (!animalId) {
      setError(
        "Informações necessárias para excluir o animal não estão disponíveis."
      );
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const confirmDelete = window.confirm(
        `Tem certeza de que deseja excluir o animal: ${cowNumber} ${
          cowName || "Sem nome"
        }?`
      );

      if (confirmDelete) {
        const deleteUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}animal/farmer/${farmerId}/farm/${farmId}/animal/${animalId}`;

        await axios.delete(deleteUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        alert("Animal excluído com sucesso!");
        router.replace("/cadastro_animais");
      }
    } catch (error: any) {
      setError(error.response?.data?.error || "Erro ao excluir o animal.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleFormSubmit} animatePulse={isLoading}>
      <div id="top"></div>
      <FormText type="title">ATUALIZAR ANIMAL:</FormText>

      <FormText type="label-large">NÚMERO:</FormText>
      <FormInput
        size="select"
        type="select"
        value={`${cowNumber}`}
        onChange={handleSelectChange}
        options={cowList
          ?.slice()
          .sort((a, b) => parseInt(a.number) - parseInt(b.number))
          .map((cow) => ({
            label: `${cow.number} - ${cow.name || ""} ${getPregnancyStatus(
              cow.expectedDate ?? null
            )}`,
            value: `${cow.number}`,
          }))}
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
        onChange={(e) => setCalvingDate(e.target.value)}
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

      <Button type="submit" disabled={isLoading}>Atualizar animal</Button>
      <Button type="button" onClick={deleteAnimal}>
        Excluir animal
      </Button>
      <Button type="button" onClick={goBack}>
        Voltar
      </Button>
    </Form>
  );
};

export default CowUpdateForm;
