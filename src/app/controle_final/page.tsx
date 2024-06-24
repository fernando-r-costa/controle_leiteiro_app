"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "../components/form/page";
import Button from "../components/buttons/page";
import FormText from "../components/texts/page";

const EndForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const farmerId = params.get("farmerId");
  const farmId = params.get("farmId");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/atividades?farmerId=${farmerId}&farmId=${farmId}`);
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <FormText type={"title"}>Pesagem Finalizada!</FormText>

      <Button type="submit">Encerrar</Button>
    </Form>
  );
};

export default EndForm;
