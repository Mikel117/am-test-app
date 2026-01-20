"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { fetchCharacters } from "@/store/characters/characters.slice";
import { useEffect } from "react";

export default function CharacterPage() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((s) => s.characters);

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  if (loading) return <div>Cargando personajes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Character Page</h1>
    </div>
  );
}
