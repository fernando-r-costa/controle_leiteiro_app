"use client";
import { useRouter } from "next/navigation";
import { Form } from "../components/form/page";
import { FormTitle } from "../components/texts/page";
import { Button } from "../components/buttons/page";

const EndForm = () => {
  const router = useRouter();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/login");
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <FormTitle>Pesagem Finalizada!</FormTitle>

      <Button type="submit">Encerrar</Button>
    </Form>
  );
};

export default EndForm;
