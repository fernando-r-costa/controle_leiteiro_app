"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Form from "../components/form/page";
import FormText from "../components/texts/page";
import FormInput from "../components/inputs/page";
import Button from "../components/buttons/page";

interface  Login {
  token: string;
  farmerId: number;
}

const LoginForm: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
        }
      );
      const { token, farmerId } = response.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("farmerId", String(farmerId));
      setError("");
      router.push(`/fazenda`);
    } catch (error: any) {
      setIsLoading(false);
      setError(
        error.response?.data?.error ||
          "Erro ao fazer login. Verifique suas credenciais."
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

      <Button type="submit">Entrar</Button>
      <Button type="button" onClick={newFarmer}>
        Novo cadastro
      </Button>
    </Form>
  );
};

export default LoginForm;
