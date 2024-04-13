"use client";
import { useRouter } from "next/navigation";
import Form from "../components/form/page";
import FormText from "../components/texts/page";
import FormInput from "../components/inputs/page";
import Button from "../components/buttons/page";
import { useState } from "react";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("teste@teste.com");
  const [password, setPassword] = useState("teste1234");
  const [error, setError] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, insira um e-mail válido.");
      return;
    }
    if (!password) {
      setError("Por favor, insira uma senha.");
      return;
    }

    setError("");
    console.log("🚀  email: " + email, "password: " + password);
    router.push("/startForm");
  };

  return (
    <Form onSubmit={handleFormSubmit}>
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
    </Form>
  );
};

export default Login;
