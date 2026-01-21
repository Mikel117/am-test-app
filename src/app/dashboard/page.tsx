"use client";

import { CharacterCardInformation, LoadingState } from "@/components";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchCharacters } from "@/store/characters/characters.slice";
import { useEffect } from "react";
import styles from "./page.module.css";
import { useCharacters } from "@/hooks/useCharacters";

export default function CharacterPage() {
  const dispatch = useAppDispatch();
  const selectedCharacter = useAppSelector((state) => state.characters.characterSelected);
  
  const { characters, isLoading, isError } = useCharacters();

  useEffect(() => {
    if (characters.length > 0) {
      dispatch(fetchCharacters());
    }
  }, [dispatch, characters]);

  if (isLoading) {
    return (
      <div className={styles.characterInformationContainer}>
        <LoadingState message="Cargando personajes..." type="loading" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.characterInformationContainer}>
        <LoadingState message="Error al cargar personajes" type="error" />
      </div>
    );
  }

  if (!selectedCharacter) {
    return (
      <div className={styles.characterInformationContainer}>
        <LoadingState message="No se ha seleccionado ningún personaje." type="info" />
      </div>
    );
  }

  return (
    <div className={styles.characterInformationContainer}>
      <CharacterCardInformation character={selectedCharacter} />
    </div>
  );
}
