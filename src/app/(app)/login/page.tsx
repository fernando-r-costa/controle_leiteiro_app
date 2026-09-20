"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Form from "../components/form";
import FormText from "../components/texts";
import FormInput from "../components/inputs";
import Button from "../components/buttons";

interface Login {
  token: string;
  farmerId: number;
}

const SAFE_LOGIN_API_ERRORS = new Set([
  "E-mail não encontrado!",
  "Senha inválida!",
  "Campos obrigatórios não preenchidos",
]);

const LoginForm: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, insira um e-mail válido.");
      return;
    }
    if (!password) {
      setError("Por favor, insira uma senha.");
      return;
    } else if (password.length < 8) {
      setError("Por favor, insira uma senha com no mínimo 8 caracteres.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post<Login>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}farmer/login`,
        {
          email,
          password,
        },
      );
      const { token, farmerId } = response.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("farmerId", String(farmerId));
      sessionStorage.setItem("showTrialSummaryAfterLogin", "true");
      setError("");
      setIsLoading(false);
      router.push(`/fazenda`);
    } catch (error: any) {
      setIsLoading(false);
      const apiError = error.response?.data?.error;
      setError(
        typeof apiError === "string" && SAFE_LOGIN_API_ERRORS.has(apiError)
          ? apiError
          : "Erro ao fazer login. Verifique seu e-mail e senha.",
      );
    }
  };

  const newFarmer = () => {
    setIsLoading(true);
    router.push("/cadastro_produtor");
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <Form onSubmit={handleFormSubmit} animatePulse={isLoading}>
      <FormText type="title">Login:</FormText>

      <FormText type="label-large">E-MAIL:</FormText>
      <FormInput
        size="large"
        type={"email"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <FormText type="label-large">SENHA:</FormText>
      <FormInput
        size="large"
        type={"password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <FormText type="error">{error}</FormText>}

      <Button type="submit" disabled={isLoading}>Entrar</Button>
      <p className="mb-4 max-w-md text-sm leading-relaxed text-primary-color">
        Usou a versão experimental? Os cadastros e dados anteriores não foram
        migrados. Para utilizar esta versão, faça um novo cadastro.
      </p>
      <Button type="button" onClick={newFarmer}>
        Novo cadastro
      </Button>
    </Form>
  );
};

export default LoginForm;
