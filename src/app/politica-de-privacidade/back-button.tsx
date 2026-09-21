"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="shrink-0 rounded-lg border border-light-color/70 px-3 py-2 text-sm font-semibold transition-colors hover:border-tertiary-color hover:text-tertiary-color focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary-color focus-visible:ring-offset-2 focus-visible:ring-offset-primary-color sm:px-4"
    >
      Voltar
    </button>
  );
}
