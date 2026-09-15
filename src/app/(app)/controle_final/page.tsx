"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Form from "../components/form/page";
import Button from "../components/buttons/page";
import FormText from "../components/texts/page";

const EndForm: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    localStorage.removeItem('controlDate');
    localStorage.removeItem('newControl');
    localStorage.removeItem('controlDateList');

    router.replace("/atividades");
  };

  return (
    <Form onSubmit={handleFormSubmit} animatePulse={isLoading}>
      <FormText type="title">Pesagem Finalizada!</FormText>
      <FormText type="label-short">Seus dados foram salvos com sucesso.</FormText>

      {!isLoading && (
        <Button type="submit">Encerrar</Button>
      )}
    </Form>
  );
};

export default EndForm;
