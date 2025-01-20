"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR, { mutate } from "swr";
import axios from "axios";
import Form from "../components/form/page";
import FormText from "../components/texts/page";
import FormInput from "../components/inputs/page";
import Button from "../components/buttons/page";
import { Animal } from "../atualiza_animal/page";

interface DairyProductionRecord {
  registerId: number;
  dairyDateControl: string;
  animalId: number;
  weightMilking1: string;
  weightMilking2?: string;
  weightMilking3?: string;
  dim?: number;
  dtc?: number;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const IndividualProductionForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const farmerId = params.get("farmerId");
  const farmId = params.get("farmId");
  const controlDate = params.get("controlDate");

  const [cowNumber, setCowNumber] = useState("");
  const [cowName, setCowName] = useState("");
  const [weightMilking1, setWeightMilking1] = useState("");
  const [weightMilking2, setWeightMilking2] = useState("");
  const [weightMilking3, setWeightMilking3] = useState("");
  const [error, setError] = useState("");
  const [animalId, setAnimalId] = useState<number>();
  const [registerId, setRegisterID] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);

  const apiAnimalUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}animal`;
  const {
    data: cowList,
    error: cowListError,
    isLoading: cowListIsLoading,
  } = useSWR<Animal[]>(`${apiAnimalUrl}/farm/${farmId}`, fetcher);

  const apiDairyControlUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}dairy-control`;
  const {
    data: dairyControl,
    error: dairyControlError,
    isLoading: dairyControlIsLoading,
  } = useSWR<DairyProductionRecord[]>(
    `${apiDairyControlUrl}/date/${controlDate}`,
    fetcher
  );

  useEffect(() => {
    if (cowListError) {
      setError("Erro ao carregar animais");
    } else {
      setError("");
    }
  }, [cowListError]);

  useEffect(() => {
    if (dairyControlIsLoading) {
      setIsLoading(false);
    }
    if (dairyControlError) {
      setError("Erro ao carregar controle de leite");
    } else {
      setError("");
      setIsLoading(false);
    }
  }, [dairyControlError, dairyControlIsLoading]);

  useEffect(() => {
    if (!cowNumber) {
      setAnimalId(undefined);
      setCowName("");
      setWeightMilking1("");
      setWeightMilking2("");
      setWeightMilking3("");
      return;
    }

    const cow = cowList?.find((cow) => cow.number === cowNumber);
    setAnimalId(cow?.animalId || 0);
    setCowName(cow?.name || "");
  }, [cowNumber, cowList]);

  useEffect(() => {
    if (!animalId || !dairyControl) return;

    const register = dairyControl.find((dairy) => dairy.animalId === animalId);
    setRegisterID(register?.registerId);
    setWeightMilking1(register?.weightMilking1 || "");
    setWeightMilking2(register?.weightMilking2 || "");
    setWeightMilking3(register?.weightMilking3 || "");
  }, [animalId, dairyControl]);

  const cowNumberRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cowNumber) {
      setError("Por favor, insira um número para identificação");
      return;
    }

    if (!weightMilking1) {
      setError("Por favor, insira uma pesagem.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      if (!registerId) {
        const dairyControlRegisterPost = {
          dairyDateControl: controlDate,
          animalId: animalId,
          weightMilking1: weightMilking1,
          weightMilking2: weightMilking2 || null,
          weightMilking3: weightMilking3 || null,
        };
        await axios.post(`${apiDairyControlUrl}`, dairyControlRegisterPost);
      } else {
        const dairyControlRegisterPut = {
          registerId: registerId,
          dairyDateControl: controlDate,
          animalId: animalId,
          weightMilking1: weightMilking1,
          weightMilking2: weightMilking2 || null,
          weightMilking3: weightMilking3 || null,
        };
        await axios.put(`${apiDairyControlUrl}`, dairyControlRegisterPut);
      }
    } catch (error) {
      setError("Erro ao salvar controle de leite!");
    }

    mutate(`${apiDairyControlUrl}/date/${controlDate}`);
    setCowNumber("");
    setCowName("");
    setWeightMilking1("");
    setWeightMilking2("");
    setWeightMilking3("");
    setIsLoading(false);

    setTimeout(() => {
      cowNumberRef.current?.focus();
    }, 500);

    const topElement = document.getElementById("top");
    topElement?.scrollIntoView({ behavior: "smooth" });
  };

  const finishProductionControl = () => {
    if (
      cowNumber !== "" ||
      cowName !== "" ||
      weightMilking1 !== "" ||
      weightMilking2 !== "" ||
      weightMilking3 !== ""
    ) {
      setError("Por favor, salve os dados antes de finalizar.");
      return;
    }
    router.push(`/controle_final?farmerId=${farmerId}&farmId=${farmId}`);
  };

  return (
    <Form onSubmit={handleFormSubmit} animatePulse={isLoading}>
      <div id="top"></div>
      <FormText type="title">Insira os dados do animal:</FormText>

      <FormText type="label-large">Número</FormText>
      <FormInput
        size="large"
        type={"number"}
        value={cowNumber}
        onChange={(e) => setCowNumber(e.target.value)}
        ref={cowNumberRef}
      />

      <FormText type="label-large">Nome:</FormText>
      <FormInput
        size="large"
        type={"text"}
        value={cowName}
        onChange={(e) => setCowName(e.target.value)}
      />

      <ul className="flex gap-4 flex-nowrap mb-8">
        <li className="flex flex-col items-center">
          <FormText type="label-short">Ordenha 1:</FormText>
          <FormInput
            size="short"
            type={"number"}
            value={weightMilking1}
            onChange={(e) => setWeightMilking1(e.target.value)}
          />
        </li>
        <li className="flex flex-col items-center">
          <FormText type="label-short">Ordenha 2:</FormText>
          <FormInput
            size="short"
            type={"number"}
            value={weightMilking2}
            onChange={(e) => setWeightMilking2(e.target.value)}
          />
        </li>
        <li className="flex flex-col items-center">
          <FormText type="label-short">Ordenha 3:</FormText>
          <FormInput
            size="short"
            type={"number"}
            value={weightMilking3}
            onChange={(e) => setWeightMilking3(e.target.value)}
          />
        </li>
      </ul>

      {error && <FormText type="error">{error}</FormText>}

      <Button type="submit">Próximo Animal</Button>
      <Button type="button" onClick={finishProductionControl}>
        Finalizar Pesagem
      </Button>
    </Form>
  );
};

export default IndividualProductionForm;
