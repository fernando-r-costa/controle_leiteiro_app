"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import authenticatedApi from "@/lib/authenticated-api";
import useSWR, { mutate } from "swr";
import Form from "../components/form";
import FormText from "../components/texts";
import FormInput from "../components/inputs";
import Button from "../components/buttons";

interface Farm {
  farmId: number;
  name: string;
  farmerId: number;
}

interface TrialSummary {
  showModal: boolean;
  trialStatus: "active" | "expired";
  expiresAt: string;
  currentPeriodEndsAt?: string;
  allowances?: {
    spreadsheet: 0 | 1;
    aiReport: 0 | 1;
  };
}

function formatTrialDate(value: string): string {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return match ? `${match[3]}/${match[2]}/${match[1]}` : value;
}

const fetcher = async (url: string) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  const res = await authenticatedApi.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const FarmForm: React.FC = () => {
  const router = useRouter();

  const [farmId, setFarmId] = useState<number>(0);
  const [farmName, setFarmName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [trialSummary, setTrialSummary] = useState<TrialSummary | null>(null);
  const trialSummaryRequestedRef = useRef(false);

  const farmerId =
    typeof window !== "undefined" ? localStorage.getItem("farmerId") : null;
  const authToken =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  const apiUrl =
    authToken && farmerId
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}farm/farmer/${farmerId}`
      : null;
  const { data: farmList, error: farmError } = useSWR<Farm[]>(apiUrl, fetcher);

  useEffect(() => {
    if (trialSummaryRequestedRef.current) return;
    if (sessionStorage.getItem("showTrialSummaryAfterLogin") !== "true") return;

    trialSummaryRequestedRef.current = true;
    sessionStorage.removeItem("showTrialSummaryAfterLogin");

    const token = localStorage.getItem("authToken");
    const currentFarmerId = localStorage.getItem("farmerId");
    if (!token || !currentFarmerId) return;

    const loadTrialSummary = async () => {
      try {
        const response = await authenticatedApi.get<TrialSummary>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}report/farmer/${currentFarmerId}/trial-summary`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.showModal) {
          setTrialSummary(response.data);
        }
      } catch {}
    };

    void loadTrialSummary();
  }, []);

  useEffect(() => {
    if (farmError) {
      console.error("Erro ao carregar fazendas:", farmError);
      setError("Erro ao carregar fazendas!");
    }
  }, [farmError]);

  useEffect(() => {
    if (farmList) {
      if (farmList.length > 0) {
        setFarmId(Number(farmList[0].farmId));
        setFarmName(farmList[0].name);
      }
      setIsLoading(false);
    }
  }, [farmList]);

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFarmId(Number(e.target.value));
    const target = e.target as HTMLSelectElement;
    setFarmName(target.selectedOptions[0].text);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!farmId) {
      setError("Por favor, selecione uma fazenda.");
      return;
    }

    setError("");
    setIsLoading(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("farmId", farmId.toString());
      localStorage.setItem("farmName", farmName);
    }
    router.push("/atividades");
  };

  const newFarm = () => {
    setIsLoading(true);
    router.push(`/cadastro_fazenda`);
  };

  return (
    <>
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
      </Form>

      {trialSummary && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-dark-color/60 px-4 py-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="trial-summary-title"
        >
          <div className="max-h-full w-full max-w-lg overflow-y-auto rounded-lg bg-light-color p-6 text-dark-color shadow-lg sm:p-8">
            <h2 id="trial-summary-title" className="mb-5 text-2xl font-semibold">
              {trialSummary.trialStatus === "active"
                ? "Benefício de relatórios ativo"
                : "Benefício de relatórios encerrado"}
            </h2>

            {trialSummary.trialStatus === "active" ? (
              <div className="space-y-4 text-base sm:text-lg">
                <p>
                  Seu benefício de relatórios dos primeiros 3 meses é válido até{" "}
                  {formatTrialDate(trialSummary.expiresAt)}.
                </p>
                <p>
                  A cota deste período mensal é válida até{" "}
                  {formatTrialDate(trialSummary.currentPeriodEndsAt || "")}.
                </p>
                <p>Neste período:</p>
                <div className="space-y-2 rounded-lg bg-white/60 p-4">
                  <p className="flex items-center justify-between gap-4">
                    <span>Planilha:</span>
                    <strong>
                      {trialSummary.allowances?.spreadsheet === 1
                        ? "1 disponível"
                        : "Utilizada"}
                    </strong>
                  </p>
                  <p className="flex items-center justify-between gap-4">
                    <span>Relatório IA:</span>
                    <strong>
                      {trialSummary.allowances?.aiReport === 1
                        ? "1 disponível"
                        : "Utilizado"}
                    </strong>
                  </p>
                </div>
                <p>
                  Mesmo após utilizar a cota do período, você pode gerar relatórios
                  adicionais com pagamento por relatório.
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-base sm:text-lg">
                <p>
                  Seu benefício de relatórios dos primeiros 3 meses terminou em{" "}
                  {formatTrialDate(trialSummary.expiresAt)}.
                </p>
                <p>Os relatórios já liberados continuam disponíveis.</p>
                <p>
                  Você pode gerar novos relatórios com pagamento por relatório.
                </p>
              </div>
            )}

            <div className="mt-7">
              <Button type="button" onClick={() => setTrialSummary(null)}>
                Continuar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FarmForm;
