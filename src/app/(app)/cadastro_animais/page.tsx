"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Form from "../components/form/page";
import FormText from "../components/texts/page";
import Button from "../components/buttons/page";

const ActivitiesForm: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const goTo = (atividade: string) => () => {
    setIsLoading(true);
    router.push(`/${atividade}`);
  };

  const goBack = () => {
    setIsLoading(true);
    router.replace(`/atividades`);
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <Form animatePulse={isLoading}>
      <FormText type="title">CADASTRO DE ANIMAIS:</FormText>

      <Button type="button" onClick={goTo("atualiza_animal")}>
        Atualizar animal
      </Button>
      <Button type="button" onClick={goTo("novo_animal")}>
        Cadastrar novo animal
      </Button>
      <Button type="button" onClick={goBack}>
        Voltar
      </Button>
    </Form>
  );
};

export default ActivitiesForm;
