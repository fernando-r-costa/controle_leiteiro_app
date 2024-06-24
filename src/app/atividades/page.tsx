"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "../components/form/page";
import FormText from "../components/texts/page";
import Button from "../components/buttons/page";

const ActivitiesForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const farmerId = params.get("farmerId");
  const farmId = params.get("farmId");

  const goTo = (atividade: string) => () => {
    router.push(`${atividade}?farmerId=${farmerId}&farmId=${farmId}`);
  };

  const goBack = () => {
    router.push(`fazenda?farmerId=${farmerId}`);
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
