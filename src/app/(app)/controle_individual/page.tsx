"use client";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import axios from "axios";
import Form from "../components/form/page";
import FormText from "../components/texts/page";
import FormInput from "../components/inputs/page";
import Button from "../components/buttons/page";

interface Animal {
  animalId: number;
  name: string;
  number: string;
  calvingDate: string;
  expectedDate?: string;
  farmId: number;
  farm: {
    farmerId: number;
  };
}

interface DairyProductionRecord {
  registerId: number;
  dairyDateControl: string;
  animalId: number;
  weightMilking1: string;
  weightMilking2?: string;
  weightMilking3?: string;
  dim?: number;
  dtc?: number;
  animal: Animal;
}

const fetcher = async (url: string) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const IndividualProductionForm: React.FC = () => {
  const router = useRouter();
  const farmerId =
    typeof window !== "undefined" ? localStorage.getItem("farmerId") : null;
  const farmId =
    typeof window !== "undefined" ? localStorage.getItem("farmId") : null;
  const controlDate =
    typeof window !== "undefined" ? localStorage.getItem("controlDate") : null;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  const isNewControl =
    typeof window !== "undefined"
      ? localStorage.getItem("newControl") === "true"
      : false;

  const [cowNumber, setCowNumber] = useState("");
  const [cowName, setCowName] = useState("");
  const [weightMilking1, setWeightMilking1] = useState("");
  const [weightMilking2, setWeightMilking2] = useState("");
  const [weightMilking3, setWeightMilking3] = useState("");
  const [error, setError] = useState("");
  const [animalId, setAnimalId] = useState<number>();
  const [registerId, setRegisterID] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);
  const selectRef = useRef<HTMLSelectElement>(null);

  const apiAnimalUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}animal`;
  const apiDairyControlUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}dairy-control`;

  const apiKeyDate = useMemo(() => {
  if (!controlDate) return null;
  if (!controlDate.includes('T')) {
    return `${controlDate}T00:00:00.000Z`;
  }
  return controlDate;
}, [controlDate]);

  const {
    data: dairyControlRecords,
    error: dairyControlError,
    isLoading: dairyControlLoading,
  } = useSWR<DairyProductionRecord[]>(
    `${apiDairyControlUrl}/farmer/${farmerId}/farm/${farmId}/date/${apiKeyDate}`,
    fetcher,
    {
      dedupingInterval: 0,
      refreshInterval: 5 * 60 * 1000,
      revalidateOnFocus: false,
      revalidateOnMount: true,
    }
  );

  const {
    data: animalList,
    error: animalListError,
    isLoading: animalListLoading,
  } = useSWR<Animal[]>(
    `${apiAnimalUrl}/farmer/${farmerId}/farm/${farmId}`,
    fetcher,
    {
      dedupingInterval: 0,
      refreshInterval: 5 * 60 * 1000,
      revalidateOnFocus: false,
      revalidateOnMount: true,
    }
  );

  const sortByNumber = (a: string, b: string) =>
    a.localeCompare(b, undefined, { numeric: true });

  const getPregnancyStatus = (expectedDate: string | undefined): string => {
    if (!expectedDate) return "";

    const today = new Date();
    const expected = new Date(expectedDate);
    const diffTime = expected.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 60) return "(P+)";
    return "(P)";
  };

  const findAnimalData = useCallback(
    (number: string) => {
      const records = Array.isArray(dairyControlRecords)
        ? dairyControlRecords
        : [];

      const existingRecord = records.find(
        (record) => record?.animal?.number === number
      );
      if (existingRecord) return existingRecord;

      return animalList?.find((animal) => animal.number === number);
    },
    [dairyControlRecords, animalList]
  );

  const getSelectOptions = () => {
    const records = Array.isArray(dairyControlRecords)
      ? dairyControlRecords
      : [];

    return [
      ...(animalList || [])
        .sort((a, b) => sortByNumber(a.number, b.number))
        .map((animal) => ({
          label: `${animal.number} - ${animal.name} ${getPregnancyStatus(
            animal.expectedDate
          )}${
            records.some((record) => record.animal.number === animal.number)
              ? " (Anotado)"
              : ""
          }`,
          value: animal.number,
        })),
    ];
  };

  useEffect(() => {
    if (dairyControlLoading || animalListLoading) {
      setIsLoading(true);
      return;
    }

    if (dairyControlError) {
      setError("Erro ao carregar controle de leite");
      setIsLoading(false);
    }

    if (animalListError) {
      setError("Erro ao carregar animais");
      setIsLoading(false);
    }

    setIsLoading(false);
  }, [
    dairyControlError,
    dairyControlLoading,
    animalListError,
    animalListLoading,
  ]);

  useEffect(() => {
    if (!cowNumber) {
      setAnimalId(undefined);
      setCowName("");
      setWeightMilking1("");
      setWeightMilking2("");
      setWeightMilking3("");
      return;
    }

    const animalData = findAnimalData(cowNumber);

    if (animalData) {
      if ("animal" in animalData) {
        const record = animalData as DairyProductionRecord;
        setAnimalId(record.animal.animalId);
        setCowName(record.animal.name);
        setRegisterID(record.registerId);
        setWeightMilking1(record.weightMilking1);
        setWeightMilking2(record.weightMilking2 || "");
        setWeightMilking3(record.weightMilking3 || "");
      } else {
        const animal = animalData as Animal;
        setAnimalId(animal.animalId);
        setCowName(animal.name);
        setRegisterID(undefined);
        setWeightMilking1("");
        setWeightMilking2("");
        setWeightMilking3("");
      }
    } else {
      setAnimalId(undefined);
      setCowName("");
      setRegisterID(undefined);
      setWeightMilking1("");
      setWeightMilking2("");
      setWeightMilking3("");
    }
  }, [cowNumber, findAnimalData]);

  useEffect(() => {
    if (!isLoading && animalList && animalList.length > 0) {
      const sortedAnimals = [...animalList].sort((a, b) =>
        sortByNumber(a.number, b.number)
      );

      if (
        Array.isArray(dairyControlRecords) &&
        dairyControlRecords.length > 0
      ) {
        const sortedRecords = [...dairyControlRecords].sort((a, b) =>
          sortByNumber(a.animal.number, b.animal.number)
        );
        const firstRecord = sortedRecords[0];

        setCowNumber(firstRecord.animal.number);
        setCowName(firstRecord.animal.name);
        setAnimalId(firstRecord.animal.animalId);
        setRegisterID(firstRecord.registerId);
        setWeightMilking1(firstRecord.weightMilking1);
        setWeightMilking2(firstRecord.weightMilking2 || "");
        setWeightMilking3(firstRecord.weightMilking3 || "");
      } else {
        const firstAnimal = sortedAnimals[0];

        setCowNumber(firstAnimal.number);
        setCowName(firstAnimal.name);
        setAnimalId(firstAnimal.animalId);
        setRegisterID(undefined);
        setWeightMilking1("");
        setWeightMilking2("");
        setWeightMilking3("");
      }
    }
  }, [isLoading, animalList, dairyControlRecords]);

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
      const animalData = findAnimalData(cowNumber);
      if (!animalData) {
        setError("Animal não encontrado");
        setIsLoading(false);
        return;
      }

      const dairyControlRegister = {
        ...(registerId && { registerId }),
        dairyDateControl: controlDate,
        animalId: animalId,
        weightMilking1: weightMilking1,
        weightMilking2: weightMilking2 || "0.0",
        weightMilking3: weightMilking3 || "0.0",
        dim:
          "dim" in animalData
            ? (animalData as DairyProductionRecord).dim || 0
            : 0,
        dtc:
          "dtc" in animalData
            ? (animalData as DairyProductionRecord).dtc || 0
            : 0,
        farmerId: parseInt(farmerId || "0"),
      };

      if (!registerId) {
        await axios.post(`${apiDairyControlUrl}`, dairyControlRegister, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.put(`${apiDairyControlUrl}`, dairyControlRegister, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      
      await mutate(
        `${apiDairyControlUrl}/farmer/${farmerId}/farm/${farmId}/date/${apiKeyDate}`
      );

      setCowNumber("");
      setCowName("");
      setWeightMilking1("");
      setWeightMilking2("");
      setWeightMilking3("");

      setTimeout(() => {
        selectRef.current?.focus();
      }, 500);

      const topElement = document.getElementById("top");
      topElement?.scrollIntoView({ behavior: "smooth" });
    } catch (error: any) {
      setError(
        error.response?.data?.error || "Erro ao salvar controle de leite!"
      );
    }

    setIsLoading(false);
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const selectedNumber = e.target.value;
    setCowNumber(selectedNumber);
  };

  const handleDelete = async () => {
    if (!registerId || !farmerId || !farmId || !animalId) {
      setError("Informações necessárias para excluir não estão disponíveis.");
      return;
    }

    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir esta pesagem?"
    );
    if (!confirmDelete) return;

    setError("");
    setIsLoading(true);

    try {
      await axios.delete(
        `${apiDairyControlUrl}/farmer/${farmerId}/farm/${farmId}/animal/${animalId}/${registerId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      await mutate(
        `${apiDairyControlUrl}/farmer/${farmerId}/farm/${farmId}/date/${apiKeyDate}`
      );

      setCowNumber("");
      setCowName("");
      setWeightMilking1("");
      setWeightMilking2("");
      setWeightMilking3("");
      setAnimalId(undefined);
      setRegisterID(undefined);

      setTimeout(() => {
        selectRef.current?.focus();
      }, 500);
      const topElement = document.getElementById("top");
      topElement?.scrollIntoView({ behavior: "smooth" });

      if (dairyControlRecords && dairyControlRecords.length > 1) {
        const nextRecord = dairyControlRecords.find(
          (record) => record.registerId !== registerId
        );
        if (nextRecord) {
          setCowNumber(nextRecord.animal.number);
          setCowName(nextRecord.animal.name);
          setAnimalId(nextRecord.animal.animalId);
          setRegisterID(nextRecord.registerId);
          setWeightMilking1(nextRecord.weightMilking1);
          setWeightMilking2(nextRecord.weightMilking2 || "");
          setWeightMilking3(nextRecord.weightMilking3 || "");
        }
      }
    } catch (error: any) {
      setError(error.response?.data?.error || "Erro ao excluir pesagem!");
    }

    setIsLoading(false);
  };

  const finishProductionControl = async () => {
    if (cowNumber !== "" && weightMilking1 !== "") {
      try {
        await handleFormSubmit(new Event("submit") as any);
      } catch (error) {
        return;
      }
    }

    try {
      const updatedRecords = await axios.get(
        `${apiDairyControlUrl}/farmer/${farmerId}/farm/${farmId}/date/${apiKeyDate}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const records = updatedRecords.data;

      const animaisNaoPesados = animalList?.filter(
        (animal) =>
          !records.some(
            (record: DairyProductionRecord) =>
              record.animal.number === animal.number
          )
      );

      const totalAnimais = animalList?.length || 0;
      const totalPesados = records.length || 0;

      let mensagem = `\nTotal de animais: ${totalAnimais}`;
      mensagem += `\nAnimais pesados: ${totalPesados}`;

      if (animaisNaoPesados && animaisNaoPesados.length > 0) {
        mensagem += `\n\nAinda faltam ${animaisNaoPesados.length} animais:`;
        animaisNaoPesados
          .sort((a, b) => parseInt(a.number) - parseInt(b.number))
          .forEach((animal) => {
            mensagem += `\n→ ${animal.number} - ${animal.name}`;
          });
        mensagem += "\n\nDeseja finalizar mesmo assim?";
      } else {
        mensagem += "\n\nTodos os animais foram pesados. Deseja finalizar?";
      }

      const confirmFinish = window.confirm(mensagem);

      if (confirmFinish) {
        setIsLoading(true);
        router.replace(`/controle_final`);
      }
    } catch (error) {
      setError("Erro ao verificar dados finais");
    }
  };

  const goBack = () => {
    setIsLoading(true);
    router.replace("/controle_leiteiro");
  };

  return (
    <Form onSubmit={handleFormSubmit} animatePulse={isLoading}>
      <div id="top"></div>
      <FormText type="title">
        {isNewControl
          ? "Novo Controle Leiteiro"
          : "Atualizar Controle Leiteiro"}
      </FormText>
      <FormText type="label-short">{`Data: ${
        controlDate ? new Date(controlDate).toLocaleDateString("pt-BR", {
          timeZone: 'UTC'
        }) : ""
      }`}</FormText>

      <FormText type="label-large">Selecione o animal:</FormText>
      <FormInput
        size="select"
        type="select"
        value={cowNumber}
        onChange={handleSelectChange}
        options={getSelectOptions()}
        ref={selectRef}
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

      <Button type="submit">
        {registerId ? "Atualizar Pesagem" : "Incluir Pesagem"}
      </Button>
      {registerId && (
        <Button type="button" onClick={handleDelete}>
          Excluir Pesagem
        </Button>
      )}
      <Button type="button" onClick={finishProductionControl}>
        Finalizar Pesagem
      </Button>
      <Button type="button" onClick={goBack}>
        Voltar
      </Button>
    </Form>
  );
};

export default IndividualProductionForm;