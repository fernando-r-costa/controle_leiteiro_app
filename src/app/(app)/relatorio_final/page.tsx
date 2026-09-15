"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import Table from "../components/table";
import Form from "../components/form";
import FormText from "../components/texts";
import Button from "../components/buttons";

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

type IntelligentReportPersistenceStatus =
  | "not_generated"
  | "processing"
  | "failed"
  | "ready";

type ReportAccessStatus =
  | "owned"
  | "available"
  | "quota_used"
  | "trial_expired";

interface ReportAccessStatuses {
  spreadsheet: ReportAccessStatus;
  aiReport: ReportAccessStatus;
}

type ReportPaymentProduct = "spreadsheet" | "ai_report";
type PaymentConfirmationStatus =
  | "pending"
  | "paid"
  | "expired"
  | "canceled"
  | "failed";

interface ReportPaymentResponse {
  status: "payment_required" | "already_owned";
  payment: {
    reportPaymentId: number;
    amountCents: number;
    expiresAt: string | null;
  } | null;
  pix: {
    code: string | null;
    qrCodeBase64: string | null;
  } | null;
  reused: boolean;
}

interface PaymentModalData {
  reportPaymentId: number;
  product: ReportPaymentProduct;
  amountCents: number;
  expiresAt: string | null;
  pixCode: string;
  qrCodeBase64: string | null;
  confirmationStatus: PaymentConfirmationStatus;
  confirmationError: boolean;
}

interface PaymentConfirmationResponse {
  status: "paid" | PaymentConfirmationStatus;
  reportPaymentId: number;
  reportAccessId: number | null;
  providerStatus: string | null;
  providerStatusDetail: string | null;
}

const INTELLIGENT_REPORT_PERSISTENCE_STATUSES: IntelligentReportPersistenceStatus[] = [
  "not_generated",
  "processing",
  "failed",
  "ready",
];

function isIntelligentReportPersistenceStatus(
  value: unknown
): value is IntelligentReportPersistenceStatus {
  return INTELLIGENT_REPORT_PERSISTENCE_STATUSES.includes(
    value as IntelligentReportPersistenceStatus
  );
}

const REPORT_ACCESS_STATUSES: ReportAccessStatus[] = [
  "owned",
  "available",
  "quota_used",
  "trial_expired",
];

function isReportAccessStatus(value: unknown): value is ReportAccessStatus {
  return REPORT_ACCESS_STATUSES.includes(value as ReportAccessStatus);
}

function isReportAccessStatuses(value: unknown): value is ReportAccessStatuses {
  if (typeof value !== "object" || value === null) return false;
  const statuses = value as Record<string, unknown>;
  return (
    isReportAccessStatus(statuses.spreadsheet) &&
    isReportAccessStatus(statuses.aiReport)
  );
}

async function getTrialErrorCode(error: unknown): Promise<string | undefined> {
  if (!axios.isAxiosError(error)) return undefined;

  const data: unknown = error.response?.data;
  if (data instanceof Blob) {
    try {
      const parsed: unknown = JSON.parse(await data.text());
      if (typeof parsed === "object" && parsed !== null && "code" in parsed) {
        const code = (parsed as { code?: unknown }).code;
        return typeof code === "string" ? code : undefined;
      }
    } catch {
      return undefined;
    }
  }

  if (typeof data === "object" && data !== null && "code" in data) {
    const code = (data as { code?: unknown }).code;
    return typeof code === "string" ? code : undefined;
  }

  return undefined;
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
  const [isDownloadingIntelligentReport, setIsDownloadingIntelligentReport] =
    useState(false);
  const [intelligentReportPersistenceStatus, setIntelligentReportPersistenceStatus] =
    useState<IntelligentReportPersistenceStatus>("not_generated");
  const [isLoadingIntelligentReportStatus, setIsLoadingIntelligentReportStatus] =
    useState(true);
  const [intelligentReportStatusRefresh, setIntelligentReportStatusRefresh] =
    useState(0);
  const [reportAccessStatuses, setReportAccessStatuses] =
    useState<Partial<ReportAccessStatuses>>({});
  const [isLoadingReportAccessStatuses, setIsLoadingReportAccessStatuses] =
    useState(true);
  const [reportAccessStatusRefresh, setReportAccessStatusRefresh] = useState(0);
  const [paymentModal, setPaymentModal] = useState<PaymentModalData | null>(null);
  const [isCreatingPayment, setIsCreatingPayment] = useState(false);
  const [intelligentReportStatus, setIntelligentReportStatus] = useState<string>(
    INTELLIGENT_REPORT_STATUS_STEPS[0].message
  );
  const intelligentReportTimersRef = useRef<number[]>([]);
  const intelligentReportMinimumTimerRef = useRef<number | null>(null);
  const intelligentReportMinimumResolveRef = useRef<(() => void) | null>(null);
  const intelligentReportAbortRef = useRef<AbortController | null>(null);
  const intelligentReportStatusAbortRef = useRef<AbortController | null>(null);
  const reportAccessStatusAbortRef = useRef<AbortController | null>(null);
  const intelligentReportDownloadUrlRef = useRef<string | null>(null);
  const intelligentReportInProgressRef = useRef(false);
  const paymentInProgressRef = useRef(false);
  const paymentConfirmationTimerRef = useRef<number | null>(null);
  const paymentConfirmationAbortRef = useRef<AbortController | null>(null);
  const handledPaidPaymentIdRef = useRef<number | null>(null);
  const resumePaidActionRef = useRef<
    (product: ReportPaymentProduct) => Promise<void>
  >(async () => {});
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
      intelligentReportStatusAbortRef.current?.abort();
      reportAccessStatusAbortRef.current?.abort();
      if (intelligentReportDownloadUrlRef.current) {
        URL.revokeObjectURL(intelligentReportDownloadUrlRef.current);
        intelligentReportDownloadUrlRef.current = null;
      }
      intelligentReportInProgressRef.current = false;
      paymentInProgressRef.current = false;
      if (paymentConfirmationTimerRef.current !== null) {
        window.clearTimeout(paymentConfirmationTimerRef.current);
        paymentConfirmationTimerRef.current = null;
      }
      paymentConfirmationAbortRef.current?.abort();
      paymentConfirmationAbortRef.current = null;
    };
  }, []);

  useEffect(() => {
    intelligentReportStatusAbortRef.current?.abort();
    setIntelligentReportPersistenceStatus("not_generated");

    if (!farmerId || !farmId || !controlDate || !token) {
      setIsLoadingIntelligentReportStatus(false);
      return;
    }

    const abortController = new AbortController();
    intelligentReportStatusAbortRef.current = abortController;
    setIsLoadingIntelligentReportStatus(true);

    const loadIntelligentReportStatus = async () => {
      try {
        const response = await axios.get<{ status: IntelligentReportPersistenceStatus }>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}report/farmer/${farmerId}/farm/${farmId}/date/${controlDate}/intelligent/status`,
          {
            headers: { Authorization: `Bearer ${token}` },
            signal: abortController.signal,
          }
        );
        const status = response.data?.status;

        if (
          !abortController.signal.aborted &&
          isIntelligentReportPersistenceStatus(status)
        ) {
          setIntelligentReportPersistenceStatus(status);
        }
      } catch (statusError) {
        if (!axios.isCancel(statusError) && !abortController.signal.aborted) {
          setIntelligentReportPersistenceStatus("not_generated");
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoadingIntelligentReportStatus(false);
          intelligentReportStatusAbortRef.current = null;
        }
      }
    };

    void loadIntelligentReportStatus();

    return () => abortController.abort();
  }, [farmerId, farmId, controlDate, token, intelligentReportStatusRefresh]);

  useEffect(() => {
    reportAccessStatusAbortRef.current?.abort();
    setReportAccessStatuses({});

    if (!farmerId || !farmId || !controlDate || !token) {
      setIsLoadingReportAccessStatuses(false);
      return;
    }

    const abortController = new AbortController();
    reportAccessStatusAbortRef.current = abortController;
    setIsLoadingReportAccessStatuses(true);

    const loadReportAccessStatuses = async () => {
      try {
        const response = await axios.get<ReportAccessStatuses>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}report/farmer/${farmerId}/farm/${farmId}/date/${controlDate}/access-status`,
          {
            headers: { Authorization: `Bearer ${token}` },
            signal: abortController.signal,
          }
        );

        if (
          !abortController.signal.aborted &&
          isReportAccessStatuses(response.data)
        ) {
          setReportAccessStatuses(response.data);
        }
      } catch (statusError) {
        if (!axios.isCancel(statusError) && !abortController.signal.aborted) {
          setReportAccessStatuses({});
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoadingReportAccessStatuses(false);
          reportAccessStatusAbortRef.current = null;
        }
      }
    };

    void loadReportAccessStatuses();

    return () => abortController.abort();
  }, [farmerId, farmId, controlDate, token, reportAccessStatusRefresh]);

  const apiDairyControlUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}dairy-control`;
  const {
    data: dairyControlList,
    error: dairyControlError,
    isLoading: dairyControlLoading,
  } = useSWR<DairyControl[]>(
    token && farmerId && farmId && controlDate
      ? `${apiDairyControlUrl}/farmer/${farmerId}/farm/${farmId}/date/${controlDate}`
      : null,
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
      setReportAccessStatuses((current) => ({
        ...current,
        spreadsheet: "owned",
      }));
    } catch (error) {
      const code = await getTrialErrorCode(error);
      if (code === "CL_TRIAL_QUOTA_USED") {
        setReportAccessStatuses((current) => ({
          ...current,
          spreadsheet: "quota_used",
        }));
      } else if (code === "CL_TRIAL_EXPIRED") {
        setReportAccessStatuses((current) => ({
          ...current,
          spreadsheet: "trial_expired",
        }));
      }
      setError("Erro ao exportar o relatório.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleGenerateIntelligentReport = async () => {
    if (
      intelligentReportInProgressRef.current ||
      intelligentReportPersistenceStatus === "processing"
    ) return;

    if (!farmerId || !farmId || !controlDate || !token) {
      setError("Dados necessários para exportar o relatório não estão disponíveis.");
      return;
    }

    const shouldGenerate = intelligentReportPersistenceStatus !== "ready";

    setError("");
    intelligentReportInProgressRef.current = true;
    let minimumDuration: Promise<void> | null = null;

    if (shouldGenerate) {
      setIsGeneratingIntelligentReport(true);
      setIntelligentReportStatus(INTELLIGENT_REPORT_STATUS_STEPS[0].message);

      INTELLIGENT_REPORT_STATUS_STEPS.slice(1).forEach(({ delay, message }) => {
        const timer = window.setTimeout(
          () => setIntelligentReportStatus(message),
          delay
        );
        intelligentReportTimersRef.current.push(timer);
      });

      minimumDuration = new Promise<void>((resolve) => {
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
    } else {
      setIsDownloadingIntelligentReport(true);
    }
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

      if (minimumDuration) await minimumDuration;
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
      setIntelligentReportPersistenceStatus("ready");
      setReportAccessStatuses((current) => ({
        ...current,
        aiReport: "owned",
      }));
    } catch (error) {
      if (!isMountedRef.current) return;
      const status = axios.isAxiosError(error)
        ? error.response?.status
        : undefined;
      const code = await getTrialErrorCode(error);

      if (code === "CL_TRIAL_QUOTA_USED") {
        setReportAccessStatuses((current) => ({
          ...current,
          aiReport: "quota_used",
        }));
      } else if (code === "CL_TRIAL_EXPIRED") {
        setReportAccessStatuses((current) => ({
          ...current,
          aiReport: "trial_expired",
        }));
      }

      if (status === 503) {
        setError("O Relatório Inteligente está temporariamente indisponível.");
      } else if (status === 504) {
        setError("A geração do relatório demorou além do esperado. Tente novamente.");
      } else if (status === 502) {
        setError("Não foi possível gerar o Relatório Inteligente. Tente novamente.");
      } else {
        setError("Erro ao gerar o Relatório Inteligente.");
      }
      setIntelligentReportStatusRefresh((current) => current + 1);
    } finally {
      clearIntelligentReportTimers();
      intelligentReportAbortRef.current = null;
      intelligentReportInProgressRef.current = false;
      if (isMountedRef.current) {
        setIsGeneratingIntelligentReport(false);
        setIsDownloadingIntelligentReport(false);
      }
    }
  };

  const createOrReusePayment = async (product: ReportPaymentProduct) => {
    if (paymentInProgressRef.current) return;

    if (!farmerId || !farmId || !controlDate || !token) {
      setError("Dados necessários para gerar o Pix não estão disponíveis.");
      return;
    }

    setError("");
    paymentInProgressRef.current = true;
    setIsCreatingPayment(true);

    try {
      const response = await axios.post<ReportPaymentResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}report/farmer/${farmerId}/farm/${farmId}/date/${controlDate}/payment/${product}`,
        undefined,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.status === "already_owned") {
        setPaymentModal(null);
        setReportAccessStatuses((current) => ({
          ...current,
          [product === "spreadsheet" ? "spreadsheet" : "aiReport"]: "owned",
        }));
        setReportAccessStatusRefresh((current) => current + 1);

        if (product === "spreadsheet") {
          await handleExportExcel();
        } else {
          await handleGenerateIntelligentReport();
        }
        return;
      }

      const { payment, pix } = response.data;
      if (
        !payment ||
        !Number.isInteger(payment.reportPaymentId) ||
        payment.reportPaymentId <= 0 ||
        !Number.isInteger(payment.amountCents) ||
        payment.amountCents <= 0 ||
        !pix?.code
      ) {
        throw new Error("Resposta de pagamento inválida");
      }

      handledPaidPaymentIdRef.current = null;
      setPaymentModal({
        reportPaymentId: payment.reportPaymentId,
        product,
        amountCents: payment.amountCents,
        expiresAt: payment.expiresAt,
        pixCode: pix.code,
        qrCodeBase64: pix.qrCodeBase64,
        confirmationStatus: "pending",
        confirmationError: false,
      });
    } catch {
      if (isMountedRef.current) {
        setError("Não foi possível gerar o Pix. Tente novamente.");
      }
    } finally {
      paymentInProgressRef.current = false;
      if (isMountedRef.current) setIsCreatingPayment(false);
    }
  };

  const handleSpreadsheetAction = async () => {
    if (
      reportAccessStatuses.spreadsheet === "quota_used" ||
      reportAccessStatuses.spreadsheet === "trial_expired"
    ) {
      await createOrReusePayment("spreadsheet");
      return;
    }

    await handleExportExcel();
  };

  const handleIntelligentReportAction = async () => {
    if (
      reportAccessStatuses.aiReport === "quota_used" ||
      reportAccessStatuses.aiReport === "trial_expired"
    ) {
      await createOrReusePayment("ai_report");
      return;
    }

    await handleGenerateIntelligentReport();
  };

  const handleCopyPixCode = async () => {
    if (!paymentModal?.pixCode) return;

    try {
      await navigator.clipboard.writeText(paymentModal.pixCode);
    } catch {
      setError("Não foi possível copiar o código Pix.");
    }
  };

  const handleClosePaymentModal = () => {
    if (paymentConfirmationTimerRef.current !== null) {
      window.clearTimeout(paymentConfirmationTimerRef.current);
      paymentConfirmationTimerRef.current = null;
    }
    paymentConfirmationAbortRef.current?.abort();
    paymentConfirmationAbortRef.current = null;
    setPaymentModal(null);
  };

  resumePaidActionRef.current = async (product) => {
    if (product === "spreadsheet") {
      await handleExportExcel();
    } else {
      await handleGenerateIntelligentReport();
    }
  };

  const activePaymentId = paymentModal?.reportPaymentId;
  const activePaymentProduct = paymentModal?.product;
  const activePaymentStatus = paymentModal?.confirmationStatus;

  useEffect(() => {
    if (
      !activePaymentId ||
      !activePaymentProduct ||
      activePaymentStatus !== "pending" ||
      !token
    ) return;

    let active = true;

    const scheduleNextConfirmation = (callback: () => void) => {
      if (!active) return;
      paymentConfirmationTimerRef.current = window.setTimeout(callback, 5000);
    };

    const confirmCurrentPayment = async () => {
      if (!active) return;

      const abortController = new AbortController();
      paymentConfirmationAbortRef.current = abortController;
      let shouldContinuePolling = false;

      try {
        const response = await axios.post<PaymentConfirmationResponse>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}report/payment/${activePaymentId}/confirm`,
          undefined,
          {
            headers: { Authorization: `Bearer ${token}` },
            signal: abortController.signal,
          }
        );

        if (!active) return;
        if (response.data.reportPaymentId !== activePaymentId) {
          throw new Error("Confirmação de pagamento inválida");
        }

        if (response.data.status === "pending") {
          setPaymentModal((current) =>
            current?.reportPaymentId === activePaymentId
              ? { ...current, confirmationError: false }
              : current
          );
          shouldContinuePolling = true;
        } else if (response.data.status === "paid") {
          if (handledPaidPaymentIdRef.current === activePaymentId) return;
          handledPaidPaymentIdRef.current = activePaymentId;
          setPaymentModal(null);
          setReportAccessStatuses((current) => ({
            ...current,
            [activePaymentProduct === "spreadsheet"
              ? "spreadsheet"
              : "aiReport"]: "owned",
          }));
          setReportAccessStatusRefresh((current) => current + 1);
          await resumePaidActionRef.current(activePaymentProduct);
        } else {
          setPaymentModal((current) =>
            current?.reportPaymentId === activePaymentId
              ? {
                  ...current,
                  confirmationStatus: response.data.status,
                  confirmationError: false,
                }
              : current
          );
        }
      } catch (confirmationError) {
        if (!active || axios.isCancel(confirmationError)) return;

        setPaymentModal((current) =>
          current?.reportPaymentId === activePaymentId
            ? { ...current, confirmationError: true }
            : current
        );
        shouldContinuePolling = true;
      } finally {
        if (paymentConfirmationAbortRef.current === abortController) {
          paymentConfirmationAbortRef.current = null;
        }
        if (shouldContinuePolling) {
          scheduleNextConfirmation(confirmCurrentPayment);
        }
      }
    };

    scheduleNextConfirmation(confirmCurrentPayment);

    return () => {
      active = false;
      if (paymentConfirmationTimerRef.current !== null) {
        window.clearTimeout(paymentConfirmationTimerRef.current);
        paymentConfirmationTimerRef.current = null;
      }
      paymentConfirmationAbortRef.current?.abort();
      paymentConfirmationAbortRef.current = null;
    };
  }, [activePaymentId, activePaymentProduct, activePaymentStatus, token]);

  const spreadsheetAccessStatus = reportAccessStatuses.spreadsheet;
  const aiReportAccessStatus = reportAccessStatuses.aiReport;
  const spreadsheetButtonLabel = isExporting
    ? "Exportando..."
    : spreadsheetAccessStatus === "owned"
      ? "Baixar Planilha"
      : "Exportar Planilha";
  const intelligentReportButtonLabel = isGeneratingIntelligentReport
    ? "Gerando Relatório IA..."
    : aiReportAccessStatus === "owned" &&
        intelligentReportPersistenceStatus === "processing"
      ? "Gerando Relatório IA..."
      : aiReportAccessStatus === "owned" &&
          intelligentReportPersistenceStatus === "ready"
        ? "Baixar Relatório IA"
        : "Gerar Relatório IA";
  const paymentQrCodeSrc = paymentModal?.qrCodeBase64
    ? paymentModal.qrCodeBase64.startsWith("data:")
      ? paymentModal.qrCodeBase64
      : `data:image/png;base64,${paymentModal.qrCodeBase64}`
    : null;
  const paymentExpirationDate = paymentModal?.expiresAt
    ? new Date(paymentModal.expiresAt)
    : null;
  const formattedPaymentExpiration =
    paymentExpirationDate && !Number.isNaN(paymentExpirationDate.getTime())
      ? paymentExpirationDate.toLocaleString("pt-BR")
      : null;
  const paymentConfirmationMessage = paymentModal?.confirmationStatus === "expired"
    ? "Este Pix expirou. Feche esta janela e tente novamente para gerar um novo Pix."
    : paymentModal?.confirmationStatus === "canceled"
      ? "Este pagamento foi cancelado. Feche esta janela e tente novamente."
      : paymentModal?.confirmationStatus === "failed"
        ? "Não foi possível concluir este pagamento. Feche esta janela e tente novamente."
        : paymentModal?.confirmationError
          ? "Não foi possível verificar o pagamento agora. Tentaremos novamente."
          : "Aguardando confirmação do pagamento...";

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
        onClick={handleSpreadsheetAction}
        disabled={
          isExporting ||
          isCreatingPayment ||
          isLoadingReportAccessStatuses ||
          !spreadsheetAccessStatus
        }
      >
        {spreadsheetButtonLabel}
      </Button>
      <Button
        type="button"
        onClick={handleIntelligentReportAction}
        disabled={
          isGeneratingIntelligentReport ||
          isDownloadingIntelligentReport ||
          isCreatingPayment ||
          isLoadingIntelligentReportStatus ||
          isLoadingReportAccessStatuses ||
          !aiReportAccessStatus ||
          intelligentReportPersistenceStatus === "processing"
        }
      >
        {intelligentReportButtonLabel}
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

      {paymentModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-dark-color/60 px-4 py-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="payment-modal-title"
        >
          <div className="w-full max-w-md rounded-lg bg-light-color p-6 text-dark-color shadow-lg">
            <h2 id="payment-modal-title" className="mb-4 text-xl font-semibold">
              {paymentModal.product === "spreadsheet"
                ? "Pagamento da Planilha"
                : "Pagamento do Relatório IA"}
            </h2>

            <p className="mb-4 text-lg font-medium">
              Valor: {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(paymentModal.amountCents / 100)}
            </p>

            {paymentQrCodeSrc && (
              <Image
                src={paymentQrCodeSrc}
                alt="QR Code Pix"
                width={240}
                height={240}
                unoptimized
                className="mx-auto mb-4 h-auto w-full max-w-60"
              />
            )}

            <label htmlFor="pix-copy-code" className="mb-2 block text-sm font-medium">
              Código Pix copia e cola
            </label>
            <textarea
              id="pix-copy-code"
              value={paymentModal.pixCode}
              readOnly
              rows={4}
              className="mb-3 w-full resize-none break-all rounded-md border border-primary-color/30 bg-white p-3 text-sm text-dark-color"
            />

            <Button type="button" onClick={handleCopyPixCode}>
              Copiar código Pix
            </Button>

            {formattedPaymentExpiration && (
              <p className="mt-4 text-sm text-primary-color">
                Vencimento: {formattedPaymentExpiration}
              </p>
            )}

            <p className="mt-4 text-sm text-primary-color" aria-live="polite">
              {paymentConfirmationMessage}
            </p>

            <div className="mt-5">
              <Button type="button" onClick={handleClosePaymentModal}>
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </Form>
  );
};

export default TableForm;
