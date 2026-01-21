import { Character } from "@/characters";
import { redirect } from "next/navigation";

const getApiCharacters = async (): Promise<Character[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  const data = await fetch(`${baseUrl}/api/characters`).then(res => res.json());
  return data;
}

export default async function Home() {

  await getApiCharacters();

  redirect('/dashboard');
}
