"use client";
import { useRouter } from "next/navigation";
import { Form } from "../components/form/page";
import { FormLabelLarge, FormTitle, FormError } from "../components/texts/page";
import { FormInputLarge } from "../components/inputs/page";
import { Button } from "../components/buttons/page";
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
      <FormTitle>Login:</FormTitle>

      <FormLabelLarge>E-MAIL:</FormLabelLarge>
      <FormInputLarge
        type={"email"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <FormLabelLarge>SENHA:</FormLabelLarge>
      <FormInputLarge
        type={"password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <FormError>{error}</FormError>}

      <Button type="submit">Entrar</Button>
    </Form>
  );
};

export default Login;
