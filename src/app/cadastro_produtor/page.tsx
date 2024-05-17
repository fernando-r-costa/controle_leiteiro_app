"use client";
import { useRouter } from "next/navigation";
import Form from "../components/form/page";
import FormText from "../components/texts/page";
import FormInput from "../components/inputs/page";
import Button from "../components/buttons/page";
import { useState } from "react";

const FarmerRegisterForm = () => {
  const router = useRouter();

  const [name, setName] = useState("Fernando Costa");
  const [email, setEmail] = useState("teste@teste.com");
  const [password, setPassword] = useState("teste1234");
  const [phone, setPhone] = useState("11987654321");
  const [error, setError] = useState("");

  const handlePhoneChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (e.target instanceof HTMLInputElement) {
      let value = e.target.value;
      value = value.replace(/\D/g, "");
      value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
      value = value.replace(/(\d)(\d{4})$/, "$1-$2");
      setPhone(value);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+55)?\(\d{2}\)\s?\d{4,5}-\d{4}$/;

    if (!name) {
      setError("Por favor, insira um nome.");
      return;
    } else if (name.length < 3) {
      setError("Por favor, insira um nome com um sobrenome.");
      return;
    }
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
    if (!phoneRegex.test(phone)) {
      setError("Por favor, insira um telefone válido.");
      return;
    }

    setError("");
    console.log(
      "🚀 name: " + name,
      "email: " + email,
      "password: " + password,
      "phone: " + phone
    );
    router.back();
  };

  const goBack = () => {
    router.back();
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <FormText type="title">CADASTRAR NOVO PRODUTOR:</FormText>

      <FormText type="label-large">NOME COMPLETO:</FormText>
      <FormInput
        size="large"
        type={"text"}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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

      <FormText type="label-large">TELEFONE:</FormText>
      <FormInput
        size="large"
        type={"phone"}
        value={phone}
        onChange={handlePhoneChange}
      />

      {error && <FormText type="error">{error}</FormText>}

      <Button type="submit">Cadastrar</Button>
      <Button type="button" onClick={goBack}>
        Voltar
      </Button>
    </Form>
  );
};

export default FarmerRegisterForm;
