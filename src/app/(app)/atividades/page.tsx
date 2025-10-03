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
    router.replace(`/fazenda`);
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <Form animatePulse={isLoading}>
      <FormText type="title">SELECIONE UMA ATIVIDADE:</FormText>

      <Button type="button" onClick={goTo("cadastro_animais")}>
        Cadastro de animais
      </Button>
      <Button type="button" onClick={goTo("controle_leiteiro")}>
        Controle leiteiro
      </Button>
      <Button type="button" onClick={goTo("relatorios")}>
        Relatórios
      </Button>
      <Button type="button" onClick={goBack}>
        Voltar
      </Button>
    </Form>
  );
};

export default ActivitiesForm;
