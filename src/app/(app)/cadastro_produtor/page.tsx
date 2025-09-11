"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Form from "../components/form/page";
import FormText from "../components/texts/page";
import FormInput from "../components/inputs/page";
import Button from "../components/buttons/page";

interface Farmer {
  name: string;
  email: string;
  password: string;
  phone: string;
}

const FarmerRegisterForm: React.FC = () => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  const handleFormSubmit = async (e: React.FormEvent) => {
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
    setIsLoading(true);

    const phoneFormatted = phone.replace(/\D/g, "");
    const farmerData: Farmer = {
      name,
      email,
      password,
      phone: phoneFormatted,
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}farmer/register`,
        farmerData
      );
      router.push("/login");
    } catch (error: any) {
      setIsLoading(false);
      setError(error.response?.data?.error || "Erro ao cadastrar produtor");
    }
  };

  const goBack = () => {
    setIsLoading(true);
    router.back();
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <Form onSubmit={handleFormSubmit} animatePulse={isLoading}>
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
        onFocus={() => setIsPasswordFocused(true)}
        onBlur={() => setIsPasswordFocused(false)}
      />
      {isPasswordFocused && 
        <FormText type="error">
          Para sua segurança, não utilize a mesma senha de bancos ou outros sites importantes. Use no mínimo 8 caracteres.
        </FormText>
      }

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
