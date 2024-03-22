"use client";
import { useRouter } from "next/navigation";
import { Form } from "../components/form/page";
import { FormLabelLarge, FormTitle } from "../components/texts/page";
import { FormInputLarge } from "../components/inputs/page";
import { Button } from "../components/buttons/page";

const Login = () => {
  const router = useRouter();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/startForm");
  };

  return (
    <Form
    // onSubmit={handleFormSubmit}
    >
      <FormTitle>Login:</FormTitle>

      <FormLabelLarge>E-MAIL:</FormLabelLarge>
      <FormInputLarge
        type={"text"}
        value={""}
        // onChange={}
      />

      <FormLabelLarge>SENHA:</FormLabelLarge>
      <FormInputLarge
        type={"password"}
        value={""}
        // onChange={}
      />

      <Button type="submit">Entrar</Button>
    </Form>
  );
};

export default Login;
