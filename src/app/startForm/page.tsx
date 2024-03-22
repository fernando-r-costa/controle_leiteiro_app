"use client";
import { useRouter } from "next/navigation";
import { Form } from "../components/form/page";
import { FormLabelLarge, FormTitle } from "../components/texts/page";
import { FormInputLarge } from "../components/inputs/page";
import { Button } from "../components/buttons/page";

const StartForm = () => {
  const router = useRouter();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/individualForm");
  };

  return (
    <Form
    // onSubmit={handleFormSubmit}
    >
      <FormTitle>Dados iniciais:</FormTitle>

      <FormLabelLarge>
        Qual o nome da Fazenda ou do Retiro onde será feita a medição:
      </FormLabelLarge>
      <FormInputLarge
        type={"text"}
        value={""}
        // onChange={}
      />

      <FormLabelLarge>Informe a data da medição:</FormLabelLarge>
      <FormInputLarge
        type={"date"}
        value={""}
        // onChange={}
      />

      <FormLabelLarge>Informe a quantidade de ordenhas:</FormLabelLarge>
      <FormInputLarge
        type={"number"}
        value={""}
        // onChange={}
      />

      <Button type="submit">Iniciar</Button>
    </Form>
  );
};

export default StartForm;
