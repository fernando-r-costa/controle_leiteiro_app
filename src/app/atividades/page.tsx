"use client";
import { useRouter } from "next/navigation";
import Form from "../components/form/page";
import FormText from "../components/texts/page";
import Button from "../components/buttons/page";

const ActivitiesForm = () => {
  const router = useRouter();
  const farmerId = typeof window !== "undefined" ? localStorage.getItem("farmerId") : null;
  const farmId = typeof window !== "undefined" ? localStorage.getItem("farmId") : null;

  const goTo = (atividade: string) => () => {
    router.push(`/${atividade}`);
  };

  const goBack = () => {
    router.push(`/fazenda`);
  };

  return (
    <Form>
      <FormText type="title">SELECIONE UMA ATIVIDADE:</FormText>

      <Button type="button" onClick={goTo("controle_leiteiro")}>
        Controle leiteiro
      </Button>
      <Button type="button" onClick={goTo("relatorios")}>
        Relatórios
      </Button>
      <Button type="button" onClick={goTo("cadastrar_animais")}>
        Cadastrar animais
      </Button>
      <Button type="button" onClick={goBack}>
        Voltar
      </Button>
    </Form>
  );
};

export default ActivitiesForm;
