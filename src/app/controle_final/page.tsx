"use client";
import { useRouter } from "next/navigation";
import Form from "../components/form/page";
import Button from "../components/buttons/page";
import FormText from "../components/texts/page";

const EndForm = () => {
  const router = useRouter();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/atividades");
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <FormText type={"title"}>Pesagem Finalizada!</FormText>

      <Button type="submit">Encerrar</Button>
    </Form>
  );
};

export default EndForm;
