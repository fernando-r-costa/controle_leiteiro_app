import Image from "next/image";
import FormText from "./components/texts/page";
import LogoCL from "../../public/icon_CL.png";

export default function Home() {
  return (
    <>
      <div className="p-12 flex flex-col items-center">
        <Image
          src={LogoCL}
          alt="Logo Controle Leiteiro"
          className="w-1/4 rounded-xl"
        />
        <h1 className="font-light text-[1.7em] sm:text-[2.2em]">
          <strong className="font-semibold">Controle</strong> Leiteiro
        </h1>
        <FormText type="title">Em breve</FormText>
      </div>
    </>
  );
}
