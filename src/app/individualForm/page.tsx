"use client";
import { Form } from "../components/form/page";
import {
  FormLabelLarge,
  FormLabelShort,
  FormTitle,
} from "../components/texts/page";
import { FormInputLarge, FormInputShort } from "../components/inputs/page";
import { Button } from "../components/buttons/page";

const IndividualForm = () => {
  return (
    <Form>
      <FormTitle>Insira os dados do animal:</FormTitle>

      <FormLabelLarge>Número</FormLabelLarge>
      <FormInputLarge
        type={"number"}
        value={""}
        // onChange={}
      />

      <FormLabelLarge>Nome:</FormLabelLarge>
      <FormInputLarge
        type={"text"}
        value={""}
        // onChange={}
      />

      <FormLabelLarge>Data Parto:</FormLabelLarge>
      <FormInputLarge
        type={"date"}
        value={""}
        // onChange={}
      />

      <ul className="flex gap-4 flex-nowrap mb-8">
        <li className="flex flex-col items-center">
          <FormLabelShort>Ordenha 1:</FormLabelShort>
          <FormInputShort
            type={"number"}
            value={""}
            // onChange={}
          />
        </li>
        <li className="flex flex-col items-center">
          <FormLabelShort>Ordenha 2:</FormLabelShort>
          <FormInputShort
            type={"number"}
            value={""}
            // onChange={}
          />
        </li>
        <li className="flex flex-col items-center">
          <FormLabelShort>Ordenha 3:</FormLabelShort>
          <FormInputShort
            type={"number"}
            value={""}
            // onChange={}
          />
        </li>
      </ul>

      <ul className="flex gap-4 flex-nowrap">
        <Button type="submit">Próximo Animal</Button>
        <Button type="submit">Finalizar Pesagem</Button>
      </ul>
    </Form>
  );
};

export default IndividualForm;
