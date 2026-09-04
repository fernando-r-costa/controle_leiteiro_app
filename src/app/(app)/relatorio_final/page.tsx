"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import Table from "../components/table/page";
import Form from "../components/form/page";
import FormText from "../components/texts/page";
import Button from "../components/buttons/page";

interface Farm {
  farmId: number;
  name: string;
}

interface Animal {
  animalId: number;
  name: string;
  number: string;
  farm: Farm;
}

interface DairyControl {
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

interface TableData {
  cowNumber?: string | number;
  cowName?: string;
  dim: number;
  dtc?: number;
  weightMilking1: number;
  weightMilking2?: number;
  weightMilking3?: number;
  production?: string;
}

const INTELLIGENT_REPORT_MINIMUM_DURATION_MS = 20000;
const INTELLIGENT_REPORT_STATUS_STEPS = [
  { delay: 0, message: "Preparando sua análise inteligente..." },
  { delay: 4000, message: "Analisando os dados do controle leiteiro..." },
  {
    delay: 9000,
    message: "Avaliando tendências e animais que merecem atenção...",
  },
  { delay: 14000, message: "Montando seu relatório inteligente..." },
  { delay: 18000, message: "Gerando o PDF..." },
  { delay: 20000, message: "Finalizando seu relatório..." },
] as const;

const fetcher = async (url: string) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const TableForm: React.FC = () => {
  const router = useRouter();
  const farmerId =
    typeof window !== "undefined" ? localStorage.getItem("farmerId") : null;
  const farmId =
    typeof window !== "undefined" ? localStorage.getItem("farmId") : null;
  const controlDate =
    typeof window !== "undefined" ? localStorage.getItem("controlDate") : null;
  const farmName =
    typeof window !== "undefined" ? localStorage.getItem("farmName") : null;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const [tableData, setTableData] = useState<TableData[]>([]);
  const [title, setTitle] = useState<{ farm: string; date: string }>({
    farm: farmName || "",
    date: controlDate ? new Date(controlDate).toLocaleDateString("pt-BR", {
    timeZone: 'UTC',
  }) : "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [isGeneratingIntelligentReport, setIsGeneratingIntelligentReport] =
    useState(false);
  const [intelligentReportStatus, setIntelligentReportStatus] = useState<string>(
    INTELLIGENT_REPORT_STATUS_STEPS[0].message
  );
  const intelligentReportTimersRef = useRef<number[]>([]);
  const intelligentReportMinimumTimerRef = useRef<number | null>(null);
  const intelligentReportMinimumResolveRef = useRef<(() => void) | null>(null);
  const intelligentReportAbortRef = useRef<AbortController | null>(null);
  const intelligentReportDownloadUrlRef = useRef<string | null>(null);
  const intelligentReportInProgressRef = useRef(false);
  const isMountedRef = useRef(true);

  const clearIntelligentReportTimers = () => {
    intelligentReportTimersRef.current.forEach((timer) =>
      window.clearTimeout(timer)
    );
    intelligentReportTimersRef.current = [];

    if (intelligentReportMinimumTimerRef.current !== null) {
      window.clearTimeout(intelligentReportMinimumTimerRef.current);
      intelligentReportMinimumTimerRef.current = null;
    }
    intelligentReportMinimumResolveRef.current?.();
    intelligentReportMinimumResolveRef.current = null;
  };

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      clearIntelligentReportTimers();
      intelligentReportAbortRef.current?.abort();
      if (intelligentReportDownloadUrlRef.current) {
        URL.revokeObjectURL(intelligentReportDownloadUrlRef.current);
        intelligentReportDownloadUrlRef.current = null;
      }
      intelligentReportInProgressRef.current = false;
    };
  }, []);

  const apiDairyControlUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}dairy-control`;
  const {
    data: dairyControlList,
    error: dairyControlError,
    isLoading: dairyControlLoading,
  } = useSWR<DairyControl[]>(
    `${apiDairyControlUrl}/farmer/${farmerId}/farm/${farmId}/date/${controlDate}`,
    fetcher,
    {
      dedupingInterval: 0,
      refreshInterval: 0,
      revalidateOnFocus: false,
      revalidateOnMount: true,
    }
  );

  useEffect(() => {
    if (dairyControlLoading) {
      setIsLoading(true);
      return;
    }

    if (dairyControlError) {
      setError("Erro ao carregar os dados");
    }

    setIsLoading(false);
  }, [dairyControlError, dairyControlLoading]);

  useEffect(() => {
    if (Array.isArray(dairyControlList) && dairyControlList.length > 0) {
      const sortedList = [...dairyControlList].sort((a, b) =>
        a.animal.number.localeCompare(b.animal.number, undefined, { numeric: true })
      );

      const formattedData = sortedList.map((item) => ({
        cowNumber: item.animal.number,
        cowName: item.animal.name,
        dim: item.dim || 0,
        dtc: item.dtc || 0,
        weightMilking1: parseFloat(item.weightMilking1) || 0,
        weightMilking2: parseFloat(item.weightMilking2 || "0"),
        weightMilking3: parseFloat(item.weightMilking3 || "0"),
      }));

      setTableData(formattedData);
    }
  }, [dairyControlList]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    router.replace("/atividades");
  };

  const handleExportExcel = async () => {
    if (isExporting) return;

    if (!farmerId || !farmId || !controlDate || !token) {
      setError("Dados necessários para exportar o relatório não estão disponíveis.");
      return;
    }

    setError("");
    setIsExporting(true);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}report/farmer/${farmerId}/farm/${farmId}/date/${controlDate}/excel`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const contentDisposition = response.headers["content-disposition"];
      const encodedFilename = contentDisposition?.match(
        /filename\*=UTF-8''([^;]+)/i
      )?.[1];
      const plainFilename = contentDisposition?.match(
        /filename="?([^";]+)"?/i
      )?.[1];
      const filename = encodedFilename
        ? decodeURIComponent(encodedFilename)
        : plainFilename || "controle-leiteiro.xlsx";
      const blob =
        response.data instanceof Blob
          ? response.data
          : new Blob([response.data], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(downloadUrl);
    } catch {
      setError("Erro ao exportar o relatório.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleGenerateIntelligentReport = async () => {
    if (intelligentReportInProgressRef.current) return;

    if (!farmerId || !farmId || !controlDate || !token) {
      setError("Dados necessários para exportar o relatório não estão disponíveis.");
      return;
    }

    setError("");
    intelligentReportInProgressRef.current = true;
    setIsGeneratingIntelligentReport(true);
    setIntelligentReportStatus(INTELLIGENT_REPORT_STATUS_STEPS[0].message);

    INTELLIGENT_REPORT_STATUS_STEPS.slice(1).forEach(({ delay, message }) => {
      const timer = window.setTimeout(
        () => setIntelligentReportStatus(message),
        delay
      );
      intelligentReportTimersRef.current.push(timer);
    });

    const minimumDuration = new Promise<void>((resolve) => {
      const finishMinimumDuration = () => {
        intelligentReportMinimumTimerRef.current = null;
        intelligentReportMinimumResolveRef.current = null;
        resolve();
      };
      intelligentReportMinimumResolveRef.current = finishMinimumDuration;
      intelligentReportMinimumTimerRef.current = window.setTimeout(
        finishMinimumDuration,
        INTELLIGENT_REPORT_MINIMUM_DURATION_MS
      );
    });
    const abortController = new AbortController();
    intelligentReportAbortRef.current = abortController;

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}report/farmer/${farmerId}/farm/${farmId}/date/${controlDate}/intelligent/ai/pdf`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
          signal: abortController.signal,
        }
      );

      await minimumDuration;
      if (!isMountedRef.current) return;

      const contentDisposition = response.headers["content-disposition"];
      const encodedFilename = contentDisposition?.match(
        /filename\*=UTF-8''([^;]+)/i
      )?.[1];
      const plainFilename = contentDisposition?.match(
        /filename="?([^";]+)"?/i
      )?.[1];
      const filename = encodedFilename
        ? decodeURIComponent(encodedFilename)
        : plainFilename || "relatorio-inteligente.pdf";
      const blob =
        response.data instanceof Blob
          ? response.data
          : new Blob([response.data], { type: "application/pdf" });
      const downloadUrl = URL.createObjectURL(blob);
      intelligentReportDownloadUrlRef.current = downloadUrl;
      const link = document.createElement("a");

      try {
        link.href = downloadUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
      } finally {
        link.remove();
        URL.revokeObjectURL(downloadUrl);
        intelligentReportDownloadUrlRef.current = null;
      }
    } catch (error) {
      if (!isMountedRef.current) return;
      const status = axios.isAxiosError(error)
        ? error.response?.status
        : undefined;

      if (status === 503) {
        setError("O Relatório Inteligente está temporariamente indisponível.");
      } else if (status === 504) {
        setError("A geração do relatório demorou além do esperado. Tente novamente.");
      } else if (status === 502) {
        setError("Não foi possível gerar o Relatório Inteligente. Tente novamente.");
      } else {
        setError("Erro ao gerar o Relatório Inteligente.");
      }
    } finally {
      clearIntelligentReportTimers();
      intelligentReportAbortRef.current = null;
      intelligentReportInProgressRef.current = false;
      if (isMountedRef.current) setIsGeneratingIntelligentReport(false);
    }
  };

  return (
    <Form onSubmit={handleFormSubmit} animatePulse={isLoading}>
      {dairyControlList && dairyControlList.length > 0 ? (
        <Table data={tableData} title={title} />
      ) : (
        <FormText type="label-large">Não há dados para exibir.</FormText>
      )}

      {error && <FormText type="error">{error}</FormText>}

      <Button
        type="button"
        onClick={handleExportExcel}
        disabled={isExporting}
      >
        {isExporting ? "Exportando..." : "Exportar Excel"}
      </Button>
      <Button
        type="button"
        onClick={handleGenerateIntelligentReport}
        disabled={isGeneratingIntelligentReport}
      >
        {isGeneratingIntelligentReport
          ? "Gerando relatório..."
          : "Relatório Inteligente"}
      </Button>
      <Button type="submit">Voltar</Button>

      {isGeneratingIntelligentReport && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-dark-color/60 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="intelligent-report-modal-title"
        >
          <div className="w-full max-w-md rounded-lg bg-light-color p-6 text-dark-color shadow-lg">
            <h2
              id="intelligent-report-modal-title"
              className="mb-5 text-xl font-semibold"
            >
              Gerando seu Relatório Inteligente
            </h2>
            <div
              className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-secondary-color border-t-primary-color"
              aria-hidden="true"
            />
            <p className="text-lg font-medium" aria-live="polite">
              {intelligentReportStatus}
            </p>
            <p className="mt-2 text-sm text-primary-color">
              Isso pode levar alguns segundos.
            </p>
          </div>
        </div>
      )}
    </Form>
  );
};

export default TableForm;
