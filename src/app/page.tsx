import { Character } from "@/characters";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio",
  description: "Página de inicio de Rick and Morty Explorer. Explora personajes, episodios y el universo completo de la serie.",
  alternates: {
    canonical: "/",
  },
};

const getApiCharacters = async (): Promise<Character[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  const data = await fetch(`${baseUrl}/api/characters`).then(res => res.json());
  return data;
}

export default async function Home() {

  await getApiCharacters();

  redirect('/dashboard');
}
